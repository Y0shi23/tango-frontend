// 環境に応じたAPI URLを設定
const getApiBaseUrl = (): string => {
  // ブラウザ環境での判定
  if (typeof window !== 'undefined') {
    // 本番環境の判定（ホスト名で判断）
    if (window.location.hostname === 'tango.fumi042-server.top') {
      return 'http://tango.fumi042-server.top';
    }
    // ローカル環境
    return 'http://localhost:8080';
  }
  // サーバーサイドでは空文字列（相対パス）
  return '';
};

const API_BASE_URL = getApiBaseUrl();

export interface ApiWord {
  id: number;
  english: string;
  japanese: string;
  pronunciation?: string;
  example?: string;
  difficulty: 1 | 2 | 3;
  level: number;
  category: string;
  mastered: boolean;
  studyStatus: '初学' | '学習中' | '習得' | '完了';
  createdAt: string;
  partOfSpeech: string[];
  synonyms?: string[];
  antonyms?: string[];
  etymology?: string;
  relatedWords?: string[];
  usageNotes?: string;
}

export interface ApiWordsResponse {
  words: ApiWord[];
  total: number;
  limit: number;
  offset: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // 単語一覧取得
  async getWords(params?: {
    search?: string;
    category?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
  }): Promise<ApiWordsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.search) searchParams.append('search', params.search);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/v1/words${queryString ? `?${queryString}` : ''}`;
    
    return this.request<ApiWordsResponse>(endpoint);
  }

  // 個別単語取得
  async getWordByName(word: string): Promise<ApiWord> {
    return this.request<ApiWord>(`/api/v1/words/${encodeURIComponent(word)}`);
  }

  // カテゴリ別単語取得
  async getWordsByCategory(category: string): Promise<{ words: ApiWord[]; category: string; count: number }> {
    return this.request(`/api/v1/words/category/${encodeURIComponent(category)}`);
  }

  // ヘルスチェック
  async healthCheck(): Promise<{ status: string; database: string }> {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient; 