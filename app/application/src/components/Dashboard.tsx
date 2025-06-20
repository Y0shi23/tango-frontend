'use client';

import React from 'react';
import { BookOpen, LogOut, User, TrendingUp, Clock, Target, Award, Calendar, Brain, Zap, RotateCcw, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  // アニメーション用のCSS
  const cardAnimationStyle = {
    animationFillMode: 'both' as const,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border border-gray-200 rounded-xl mx-6 mt-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-semibold">
                W
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WordMaster</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h3 className="font-medium text-gray-900">{user?.username}</h3>
                <p className="text-sm text-gray-600">中級レベル</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.username?.charAt(0) || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <LogOut className="w-4 h-4" />
                <span>🏠 メニュー</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ウェルカムカード */}
        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl p-8 mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -translate-y-24 translate-x-16"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              おかえりなさい、{user?.username}さん！
            </h2>
            <p className="text-lg opacity-90 mb-6">今日も英単語学習を頑張りましょう。あなたの学習レベルは順調に向上しています。</p>
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full px-6 py-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">🏆 レベル 7 - 中級者</span>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{ ...cardAnimationStyle, animationDelay: '0.1s' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                📚
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,247</div>
            <div className="text-gray-600 mb-2">学習済み単語数</div>
            <div className="text-sm bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium">
              +23 (今週)
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{ ...cardAnimationStyle, animationDelay: '0.2s' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white">
                🎯
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">89%</div>
            <div className="text-gray-600 mb-2">平均正答率</div>
            <div className="text-sm bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium">
              +5% (前月比)
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{ ...cardAnimationStyle, animationDelay: '0.3s' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                ⏱️
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
            <div className="text-gray-600 mb-2">学習日数(連続)</div>
            <div className="text-sm bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium">
              毎日継続中!
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            style={{ ...cardAnimationStyle, animationDelay: '0.4s' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-600"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white">
                🔥
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <div className="text-gray-600 mb-2">今月の学習時間</div>
            <div className="text-sm bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium">
              +12h (前月比)
            </div>
          </div>
        </div>

        {/* メインコンテンツエリア */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 今日の学習メニュー */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📖 今日の学習メニュー</h3>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 hover:translate-x-1 transition-all duration-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">新規単語学習</h4>
                    <p className="text-sm text-gray-600">今日の新しい単語 15個を学習しましょう</p>
                  </div>
                  <button 
                    onClick={() => router.push('/vocabulary')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    開始
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 hover:translate-x-1 transition-all duration-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">復習</h4>
                    <p className="text-sm text-gray-600">昨日学習した単語の復習 (8個)</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    復習
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 hover:translate-x-1 transition-all duration-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">弱点強化</h4>
                    <p className="text-sm text-gray-600">正答率の低い単語の集中学習</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    練習
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 hover:translate-x-1 transition-all duration-200">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">確認テスト</h4>
                    <p className="text-sm text-gray-600">今週学習した単語のテスト</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                    テスト
                  </button>
                </div>
              </div>

              {/* 今日の学習進捗 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-900">今日の学習進捗</span>
                  <span className="text-sm text-gray-600">3/4 完了</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 最近の学習履歴 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">📈 最近の学習履歴</h3>
              
              <div className="space-y-4 mb-6">
                {[
                  { icon: '📝', title: '単語テスト完了', desc: '2時間前 • 15問中13問正解', iconBg: 'from-blue-500 to-emerald-500' },
                  { icon: '📚', title: '新規単語学習', desc: '昨日 • 12個の新単語を学習', iconBg: 'from-blue-500 to-emerald-500' },
                  { icon: '🔄', title: '復習セッション', desc: '昨日 • 25個の単語を復習', iconBg: 'from-blue-500 to-emerald-500' },
                  { icon: '🎯', title: 'レベルアップ!', desc: '3日前 • レベル7に到達', iconBg: 'from-blue-500 to-emerald-500' },
                  { icon: '🏆', title: '連続学習記録更新', desc: '1週間前 • 40日連続達成', iconBg: 'from-blue-500 to-emerald-500' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 py-3 border-b border-gray-100 last:border-b-0">
                    <div className={`w-8 h-8 bg-gradient-to-r ${activity.iconBg} rounded-full flex items-center justify-center text-white text-sm`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-xs text-gray-600">{activity.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 今月の目標進捗 */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-900">今月の目標進捗</span>
                  <span className="text-sm text-gray-600">178/200 単語</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-white {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
} 