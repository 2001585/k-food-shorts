'use client'

import { FeedPost } from './FeedPost'

const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      name: '김사장',
      username: 'mangwon_kimchi_house',
      isOwner: true,
      restaurantName: '망원동 김치찌개',
    },
    content: '안녕하세요! 망원동 김치찌개 사장 김철수입니다 😊\n\n오늘 새벽 5시에 직접 다녀온 전주 남부시장 이야기를 해볼까 합니다. 우리 가게 김치는 전부 이곳에서 직접 가져온 묵은지로 만들어요.\n\n30년 경력의 할머니가 담그신 김치로만 찌개를 끓입니다. 조미료는 단 한 방울도 넣지 않아요!\n\n오늘도 정성스럽게 준비하겠습니다 🙏\n\n#사장님의하루 #전주남부시장 #묵은지',
    image: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80',
    likes: 892,
    comments: 156,
    timestamp: '1시간 전',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '1-2',
    user: {
      name: '서울맛집러',
      username: 'seoul_foodie',
    },
    content: '망원동 숨은 맛집 발견! 🔥\n\n이 곳 김치찌개 정말 미쳤어요... 진짜 집밥 느낌 나는데 조미료 맛이 전혀 안 나고 깊은 맛이 일품이에요. 사장님도 엄청 친절하시고 가격도 착해서 자주 올 것 같아요!\n\n#망원동맛집 #김치찌개 #서울맛집',
    image: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80',
    likes: 234,
    comments: 45,
    timestamp: '2시간 전',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    user: {
      name: '부산푸디',
      username: 'busan_eats',
    },
    content: '해운대 돼지국밥 맛집 추천!\n\n새벽 6시부터 영업하는 이 집, 국물이 정말 진하고 고기도 엄청 많이 주세요. 아침 해장하러 오는 현지인들로 항상 북적북적합니다.\n\n위치: 해운대구 중동 123-45\n가격: 8,000원\n\n#부산맛집 #돼지국밥 #해운대',
    likes: 567,
    comments: 89,
    timestamp: '5시간 전',
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    user: {
      name: '디저트헌터',
      username: 'dessert_hunter',
    },
    content: '성수동 새로 생긴 디저트 카페 ✨\n\n인스타에서 핫하다길래 가봤는데 역시 실망 안 시키네요. 딸기 크림 파르페가 시그니처인데 생딸기를 진짜 아낌없이 넣어주셔서 딸기 덕후로서 감동... 분위기도 넘 좋고 사진 찍기도 좋아요!',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    likes: 892,
    comments: 124,
    timestamp: '1일 전',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '4',
    user: {
      name: '라면왕',
      username: 'ramen_king',
    },
    content: '이태원 일본 라멘집 후기\n\n일본에서 먹던 그 맛 그대로예요! 특히 돈코츠 라멘 국물이 정말 진하고 면발도 쫄깃해서 완벽했습니다. 차슈도 두툼하고 부드러워요. 다만 웨이팅이 좀 있으니 시간 여유 있을 때 방문 추천!',
    likes: 445,
    comments: 67,
    timestamp: '1일 전',
    isLiked: true,
    isSaved: false,
  },
  {
    id: '5',
    user: {
      name: '채식주의자',
      username: 'vegan_seoul',
    },
    content: '건대 비건 맛집 발견! 🌱\n\n완전 채식주의자도 부담 없이 먹을 수 있는 곳이에요. 두부 스테이크가 시그니처 메뉴인데 진짜 고기 안 부럽게 맛있어요. 샐러드도 신선하고 드레싱도 직접 만드신대요!',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    likes: 678,
    comments: 92,
    timestamp: '2일 전',
    isLiked: false,
    isSaved: true,
  },
]

interface HomeFeedProps {
  newPosts?: any[]
}

export function HomeFeed({ newPosts = [] }: HomeFeedProps) {
  const allPosts = [...newPosts, ...SAMPLE_POSTS]

  return (
    <div className="min-h-screen bg-black">
      {/* Feed Container */}
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 px-4 py-3">
          <h1 className="text-xl font-black text-white">홈</h1>
        </div>

        {/* Posts */}
        <div className="pb-20 lg:pb-0">
          {allPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
