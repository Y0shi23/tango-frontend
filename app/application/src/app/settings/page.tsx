'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { User, Settings, Bell, Target, LogOut, ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'learning' | 'account'>('profile');

  // Form states
  const [profileForm, setProfileForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    displayName: ''
  });

  const [learningForm, setLearningForm] = useState({
    targetWordsPerDay: 15,
    studyReminders: true,
    reminderTime: '20:00',
    difficultyLevel: 'intermediate'
  });

  useEffect(() => {
    // ローディングが完了して未認証の場合はルートにリダイレクト
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse text-white font-bold text-2xl">
            W
          </div>
          <h2 className="text-xl font-semibold text-gray-900">WordMaster</h2>
          <p className="text-gray-600 mt-2">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 未認証の場合は何も表示しない（リダイレクト中）
  if (!isAuthenticated) {
    return null;
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: プロファイル更新のAPI呼び出し
    alert('プロファイルが更新されました');
  };

  const handleLearningUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 学習設定の更新のAPI呼び出し
    alert('学習設定が更新されました');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-semibold">
                  W
                </div>
                <h1 className="text-2xl font-bold text-gray-900">設定</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">ようこそ、{user?.username}さん</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* サイドバー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">設定カテゴリ</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>ユーザープロファイル</span>
                </button>
                <button
                  onClick={() => setActiveTab('learning')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'learning'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Target className="w-5 h-5" />
                  <span>学習設定</span>
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === 'account'
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>アカウント設定</span>
                </button>
              </nav>
            </div>
          </div>

          {/* メインコンテンツエリア */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* ユーザープロファイル */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">ユーザープロファイル</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ユーザー名
                      </label>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ユーザー名を入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="メールアドレスを入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        表示名
                      </label>
                      <input
                        type="text"
                        value={profileForm.displayName}
                        onChange={(e) => setProfileForm({...profileForm, displayName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="表示名を入力"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      プロファイルを更新
                    </button>
                  </form>
                </div>
              )}

              {/* 学習設定 */}
              {activeTab === 'learning' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">学習設定</h2>
                  <form onSubmit={handleLearningUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        1日の目標単語数
                      </label>
                      <select
                        value={learningForm.targetWordsPerDay}
                        onChange={(e) => setLearningForm({...learningForm, targetWordsPerDay: Number(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={5}>5個</option>
                        <option value={10}>10個</option>
                        <option value={15}>15個</option>
                        <option value={20}>20個</option>
                        <option value={25}>25個</option>
                        <option value={30}>30個</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        学習難易度
                      </label>
                      <select
                        value={learningForm.difficultyLevel}
                        onChange={(e) => setLearningForm({...learningForm, difficultyLevel: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="beginner">初級</option>
                        <option value="intermediate">中級</option>
                        <option value="advanced">上級</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="study-reminders"
                        checked={learningForm.studyReminders}
                        onChange={(e) => setLearningForm({...learningForm, studyReminders: e.target.checked})}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="study-reminders" className="text-sm font-medium text-gray-700">
                        学習リマインダーを有効にする
                      </label>
                    </div>
                    {learningForm.studyReminders && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          リマインダー時間
                        </label>
                        <input
                          type="time"
                          value={learningForm.reminderTime}
                          onChange={(e) => setLearningForm({...learningForm, reminderTime: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      学習設定を更新
                    </button>
                  </form>
                </div>
              )}

              {/* アカウント設定 */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">アカウント設定</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">パスワード変更</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            現在のパスワード
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="現在のパスワードを入力"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            新しいパスワード
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="新しいパスワードを入力"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            パスワード確認
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="新しいパスワードを再入力"
                          />
                        </div>
                        <button
                          onClick={() => alert('パスワードが変更されました')}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          パスワードを変更
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">データエクスポート</h3>
                      <p className="text-gray-600 mb-4">学習データをダウンロードできます。</p>
                      <button
                        onClick={() => alert('データのエクスポートを開始しました')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        学習データをエクスポート
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-red-600 mb-4">危険な操作</h3>
                      <p className="text-gray-600 mb-4">アカウントを削除すると、すべてのデータが失われます。</p>
                      <button
                        onClick={() => {
                          if (confirm('本当にアカウントを削除しますか？この操作は取り消せません。')) {
                            alert('アカウント削除機能は現在開発中です');
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        アカウントを削除
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}