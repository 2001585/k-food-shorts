import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'K-Food Shorts Backend API is running! 🍽️';
  }
}