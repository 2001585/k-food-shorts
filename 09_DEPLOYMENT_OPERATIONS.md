# 🚀 배포 및 운영 계획

## 🎯 배포 목표
- Zero-downtime 배포
- 자동화된 CI/CD 파이프라인
- 확장 가능한 인프라 구성
- 실시간 모니터링 및 알림

## ☁️ 클라우드 인프라 구성

### AWS 기반 아키텍처
```
┌─────────────────────────────────────────────────────┐
│                   CloudFront CDN                      │
└───────────────┬────────────────┬────────────────────┘
                │                │
    ┌───────────▼───────┐ ┌─────▼──────┐
    │   ALB (Frontend)  │ │ S3 (Static) │
    └───────────┬───────┘ └─────────────┘
                │
    ┌───────────▼────────────────────┐
    │      ECS Fargate Cluster        │
    ├─────────────┬───────────────────┤
    │  Frontend   │    Backend        │
    │  Services   │    Services       │
    └─────────────┴───────────────────┘
                │
    ┌───────────▼────────────────────┐
    │         RDS (PostgreSQL)        │
    │      Multi-AZ Deployment        │
    └─────────────────────────────────┘
                │
    ┌───────────▼────────────────────┐
    │     ElastiCache (Redis)         │
    └─────────────────────────────────┘
```

### 인프라 구성 요소

#### 1. 컴퓨트 리소스
```yaml
# ECS Task Definition
family: kfood-shorts-backend
cpu: '1024'
memory: '2048'
networkMode: awsvpc

containerDefinitions:
  - name: backend
    image: ${ECR_REPO}/backend:${VERSION}
    portMappings:
      - containerPort: 3000
        protocol: tcp
    environment:
      - name: NODE_ENV
        value: production
    secrets:
      - name: DATABASE_URL
        valueFrom: arn:aws:secretsmanager:${REGION}:${ACCOUNT}:secret:db-url
```

#### 2. 데이터베이스 구성
```terraform
# terraform/rds.tf
resource "aws_db_instance" "main" {
  identifier     = "kfood-shorts-db"
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.medium"
  
  allocated_storage     = 100
  max_allocated_storage = 1000
  storage_encrypted     = true
  
  multi_az               = true
  publicly_accessible    = false
  backup_retention_period = 30
  
  enabled_cloudwatch_logs_exports = ["postgresql"]
}
```

## 🔄 CI/CD 파이프라인

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run tests
        run: |
          pnpm test:unit
          pnpm test:e2e
          
      - name: Run security scan
        run: pnpm audit

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2
          
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
        
      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/kfood-backend:$IMAGE_TAG .
          docker push $ECR_REGISTRY/kfood-backend:$IMAGE_TAG
          
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster kfood-cluster \
            --service kfood-backend \
            --force-new-deployment
```

### 배포 전략

#### Blue/Green Deployment
```json
{
  "deploymentController": {
    "type": "CODE_DEPLOY"
  },
  "loadBalancers": [
    {
      "targetGroupArn": "arn:aws:elasticloadbalancing:...",
      "containerName": "backend",
      "containerPort": 3000
    }
  ]
}
```

## 🐳 Docker 구성

### Backend Dockerfile
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

### Docker Compose (개발환경)
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@postgres:5432/kfood
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3000

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: kfood
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 📊 모니터링 시스템

### CloudWatch 대시보드
```javascript
// cloudwatch-dashboard.json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/ECS", "CPUUtilization", {"stat": "Average"}],
          [".", "MemoryUtilization", {"stat": "Average"}]
        ],
        "period": 300,
        "stat": "Average",
        "region": "ap-northeast-2",
        "title": "ECS Resource Utilization"
      }
    },
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/RDS", "DatabaseConnections"],
          [".", "CPUUtilization"],
          [".", "FreeableMemory"]
        ],
        "title": "RDS Metrics"
      }
    }
  ]
}
```

### Application Performance Monitoring (APM)
```typescript
// Sentry 설정
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 0.1,
  profilesSampleRate: 0.1,
});
```

### 로그 관리
```yaml
# fluent-bit 설정
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         5
        Log_Level     info

    [INPUT]
        Name              forward
        Listen            0.0.0.0
        Port              24224

    [OUTPUT]
        Name              cloudwatch_logs
        Match             *
        region            ap-northeast-2
        log_group_name    /aws/kfood-shorts
        log_stream_prefix ${HOSTNAME}-
```

## 🔧 운영 자동화

### 자동 스케일링
```json
{
  "targetTrackingScalingPolicies": [
    {
      "targetValue": 75.0,
      "predefinedMetricSpecification": {
        "predefinedMetricType": "ECSServiceAverageCPUUtilization"
      },
      "scaleOutCooldown": 60,
      "scaleInCooldown": 60
    }
  ],
  "minCapacity": 2,
  "maxCapacity": 10
}
```

### 백업 자동화
```bash
#!/bin/bash
# backup.sh

# RDS 스냅샷 생성
aws rds create-db-snapshot \
  --db-instance-identifier kfood-db \
  --db-snapshot-identifier kfood-db-$(date +%Y%m%d-%H%M%S)

# S3 백업
aws s3 sync /app/uploads s3://kfood-backups/uploads/$(date +%Y%m%d)

# 오래된 백업 삭제 (30일 이상)
aws rds describe-db-snapshots \
  --query "DBSnapshots[?SnapshotCreateTime<='$(date -d '30 days ago' --iso-8601)'].DBSnapshotIdentifier" \
  --output text | xargs -I {} aws rds delete-db-snapshot --db-snapshot-identifier {}
```

## 🚨 장애 대응

### 헬스체크 구성
```javascript
// health-check.js
const healthChecks = {
  database: async () => {
    const result = await db.raw('SELECT 1');
    return result.rows.length > 0;
  },
  
  redis: async () => {
    const pong = await redis.ping();
    return pong === 'PONG';
  },
  
  externalAPI: async () => {
    const response = await fetch(process.env.PUBLIC_API_URL);
    return response.status === 200;
  }
};
```

### 알림 설정
```yaml
# CloudWatch Alarms
HighErrorRate:
  Type: AWS::CloudWatch::Alarm
  Properties:
    MetricName: 4xxError
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold
    AlarmActions:
      - !Ref SNSTopic

DatabaseConnectionFailure:
  Type: AWS::CloudWatch::Alarm
  Properties:
    MetricName: DatabaseConnections
    Threshold: 0
    ComparisonOperator: LessThanThreshold
```

## 📈 성능 최적화

### CDN 설정
```json
{
  "distributionConfig": {
    "origins": [{
      "domainName": "api.kfoodshorts.com",
      "originPath": "/api",
      "customOriginConfig": {
        "originProtocolPolicy": "https-only"
      }
    }],
    "behaviors": [{
      "pathPattern": "/images/*",
      "targetOriginId": "S3-kfood-images",
      "viewerProtocolPolicy": "redirect-to-https",
      "cachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
    }]
  }
}
```

### 데이터베이스 최적화
```sql
-- 인덱스 최적화
CREATE INDEX CONCURRENTLY idx_restaurants_geo 
ON restaurants USING gist(ll_to_earth(latitude, longitude));

-- 파티셔닝
CREATE TABLE user_interactions_2024_01 
PARTITION OF user_interactions 
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Vacuum 자동화
ALTER TABLE restaurants SET (autovacuum_vacuum_scale_factor = 0.1);
```

## 🔐 보안 설정

### WAF 규칙
```json
{
  "rules": [
    {
      "name": "RateLimitRule",
      "priority": 1,
      "statement": {
        "rateBasedStatement": {
          "limit": 2000,
          "aggregateKeyType": "IP"
        }
      }
    },
    {
      "name": "SQLInjectionRule",
      "priority": 2,
      "statement": {
        "managedRuleGroupStatement": {
          "vendorName": "AWS",
          "name": "AWSManagedRulesSQLiRuleSet"
        }
      }
    }
  ]
}
```

### Secrets 관리
```typescript
// AWS Secrets Manager 사용
import { SecretsManager } from 'aws-sdk';

const secretsManager = new SecretsManager({
  region: 'ap-northeast-2'
});

async function getSecret(secretName: string) {
  const data = await secretsManager.getSecretValue({
    SecretId: secretName
  }).promise();
  
  return JSON.parse(data.SecretString);
}
```

## 📋 운영 체크리스트

### 일일 점검
- [ ] 서버 리소스 사용률 확인
- [ ] 에러 로그 확인
- [ ] API 응답 시간 모니터링
- [ ] 데이터베이스 연결 상태

### 주간 점검
- [ ] 백업 상태 확인
- [ ] 보안 업데이트 확인
- [ ] 성능 메트릭 분석
- [ ] 비용 최적화 검토

### 월간 점검
- [ ] 재해 복구 테스트
- [ ] 보안 감사
- [ ] 용량 계획 검토
- [ ] SLA 준수율 확인