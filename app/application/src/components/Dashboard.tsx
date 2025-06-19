'use client';

import React from 'react';
import { BookOpen, LogOut, User, TrendingUp, Clock, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">English Master</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium">{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            おかえりなさい、{user?.username}さん！
          </h2>
          <p className="text-gray-600">今日も英語学習を頑張りましょう。</p>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">学習単語数</h3>
            <p className="text-3xl font-bold text-gray-900">247</p>
            <p className="text-sm text-gray-600">今週</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+5%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">学習時間</h3>
            <p className="text-3xl font-bold text-gray-900">12.5</p>
            <p className="text-sm text-gray-600">時間</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">85%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">正答率</h3>
            <p className="text-3xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">今週</p>
          </div>
        </div>

        {/* 学習メニュー */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">単語学習</h3>
            <p className="text-gray-600 mb-4">新しい単語を学習してボキャブラリーを増やしましょう</p>
            <button 
              onClick={() => router.push('/vocabulary')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              学習を開始
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">復習テスト</h3>
            <p className="text-gray-600 mb-4">学習した単語の復習テストで定着度を確認</p>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
              テスト開始
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">進捗確認</h3>
            <p className="text-gray-600 mb-4">学習の進捗と成果を詳しく確認できます</p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
              詳細を見る
            </button>
          </div>
        </div>

        {/* 最近の活動 */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">最近の活動</h3>
          <div className="space-y-4">
            {[
              { action: '単語学習', words: '20語', time: '2時間前' },
              { action: '復習テスト', score: '85%', time: '1日前' },
              { action: '単語学習', words: '15語', time: '2日前' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.words && `${activity.words}を学習`}
                      {activity.score && `正答率: ${activity.score}`}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 