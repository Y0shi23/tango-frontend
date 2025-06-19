'use client';

import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // 認証済みの場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">English Master</h2>
          <p className="text-gray-600 mt-2">読み込み中...</p>
        </div>
      </div>
    );
  }

  // 認証済みの場合の処理（リダイレクト済み）
  if (isAuthenticated) {
    return null;
  }

  // 未認証の場合はランディングページを表示
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* ヘッダー */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">English Master</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/words"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              英単語辞典
            </Link>
            <Link
              href="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>ログイン</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            効率的な英語学習を
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              始めましょう
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            科学的な学習メソッドとパーソナライズされたアプローチで、
            あなたの英語力を確実に向上させます。
          </p>
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-lg"
          >
            <span>今すぐ始める</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* 機能紹介 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: "📚",
              title: "豊富な単語データベース",
              description: "10,000以上の英単語を効率的に学習",
              link: "/words"
            },
            {
              icon: "🎯",
              title: "パーソナライズされた学習",
              description: "あなたのレベルに合わせた最適な学習プラン"
            },
            {
              icon: "🏆",
              title: "成果の可視化",
              description: "学習進捗と成果を詳細に追跡"
            },
            {
              icon: "⭐",
              title: "レベルアップシステム",
              description: "ゲーム感覚で楽しく継続学習"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              {feature.link && (
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <span>今すぐ体験 →</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            多くの方に選ばれています
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">単語データベース</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">アクティブユーザー</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">満足度</div>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold">English Master</h4>
          </div>
          <p className="text-gray-400 mb-6">
            あなたの英語学習パートナー
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-white transition-colors">利用規約</button>
            <button className="hover:text-white transition-colors">プライバシーポリシー</button>
            <button className="hover:text-white transition-colors">お問い合わせ</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
