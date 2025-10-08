const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface Restaurant {
  id: string;
  businessId: string;
  name: string;
  category: string;
  subCategory?: string;
  description?: string;
  addressFull: string;
  addressCity: string;
  addressDistrict: string;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  businessHours?: string;
  ratingAvg: number;
  ratingCount: number;
  reviewCount: number;
  priceRange?: number;
  avgPrice?: number;
  contents: Content[];
  menus: Menu[];
  reviews: Review[];
}

export interface Content {
  id: string;
  type: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  caption?: string;
  tags?: string;
  width?: number;
  height?: number;
  duration?: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  category?: string;
  imageUrl?: string;
  isPopular: boolean;
  isRecommended: boolean;
}

export interface Review {
  id: string;
  rating: number;
  content?: string;
  images?: string;
  user: {
    username: string;
    displayName?: string;
    profileImage?: string;
  };
  createdAt: string;
}

export interface FeedResponse {
  restaurants: Restaurant[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
  };
}

class ApiService {
  private baseURL = API_BASE_URL;
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken() {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // 인증 없이 접근 가능한 피드 (임시)
  async getFeedPublic(params: {
    page?: number;
    limit?: number;
    category?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  } = {}): Promise<FeedResponse> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    const query = searchParams.toString();
    return this.request<FeedResponse>(`/restaurants/feed${query ? `?${query}` : ''}`);
  }

  async getRestaurant(id: string): Promise<Restaurant> {
    return this.request<Restaurant>(`/restaurants/${id}`);
  }

  async searchRestaurants(query: string): Promise<{ restaurants: Restaurant[] }> {
    return this.request<{ restaurants: Restaurant[] }>(`/restaurants/search?q=${encodeURIComponent(query)}`);
  }

  // 인증 관련 메서드들
  async register(userData: {
    email: string;
    password: string;
    username: string;
    displayName?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{ access_token: string; refresh_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    this.setToken(response.access_token);
    return response;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.request<{ access_token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    this.setToken(response.access_token);
    return response;
  }

  async logout() {
    this.clearToken();
  }
}

export const apiService = new ApiService();