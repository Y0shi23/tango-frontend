// 環境に応じたAPI URLを設定
const getApiBaseUrl = (): string => {
  // ブラウザ環境での判定
  if (typeof window !== 'undefined') {
    // 本番環境の判定（ホスト名で判断）
    if (window.location.hostname === 'tango.fumi042-server.top') {
      return 'http://tango.fumi042-server.top';
    }
    // ローカル環境 - Nginxプロキシ経由で相対パスを使用
    return '';
  }
  // サーバーサイドでは空文字列（相対パス）
  return '';
};

const API_BASE_URL = getApiBaseUrl();

export interface User {
  id: number;
  username: string;
  email: string;
  preferred_accent: string;
  study_level: string;
  created_at: string;
  last_login?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  preferred_accent?: string;
  study_level?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface UpdateProfileRequest {
  preferred_accent?: string;
  study_level?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: User;
}

export class AuthAPI {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'ログインに失敗しました');
    }

    return response.json();
  }

  static async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'アカウント作成に失敗しました');
    }

    return response.json();
  }

  static async getProfile(token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'プロフィール取得に失敗しました');
    }

    const data = await response.json();
    return data.user;
  }

  static async updateProfile(token: string, profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'プロフィール更新に失敗しました');
    }

    return response.json();
  }
}

export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'auth_user';

  static saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
} 