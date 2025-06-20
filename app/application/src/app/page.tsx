'use client';

import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight, CheckCircle, Target, TrendingUp, Award } from "lucide-react";
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

  // 認証済みの場合の処理（リダイレクト済み）
  if (isAuthenticated) {
    return null;
  }

  // 未認証の場合はランディングページを表示
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-semibold">
                W
              </div>
              <h1 className="text-2xl font-bold text-gray-900">WordMaster</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/words"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                📚 英単語辞典
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
              >
                <span>ログイン</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-8 text-4xl font-bold">
            W
          </div>
          <h2 className="text-5xl font-bold mb-6">
            効率的な英単語学習で
            <br />
            <span className="text-blue-100">
              レベルアップしよう
            </span>
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            科学的な学習メソッドとパーソナライズされたアプローチで、
            あなたの英語力を確実に向上させます。
          </p>
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-lg"
          >
            <span>🚀 今すぐ始める</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* 統計セクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              📚
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">単語データベース</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              👥
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">アクティブユーザー</div>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              ⭐
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">満足度</div>
          </div>
        </div>

        {/* 機能紹介 */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">WordMasterの特徴</h3>
          <p className="text-xl text-gray-600">最新の学習技術であなたの英語力を向上させます</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: "📚",
              title: "豊富な単語データベース",
              description: "10,000以上の英単語を効率的に学習できます",
              link: "/words",
              gradient: "from-blue-500 to-emerald-500"
            },
            {
              icon: "🎯",
              title: "パーソナライズ学習",
              description: "あなたのレベルに合わせた最適な学習プラン",
              gradient: "from-emerald-500 to-green-600"
            },
            {
              icon: "🏆",
              title: "成果の可視化",
              description: "学習進捗と成果を詳細に追跡・分析",
              gradient: "from-amber-500 to-orange-500"
            },
            {
              icon: "⚡",
              title: "レベルアップシステム",
              description: "ゲーム感覚で楽しく継続学習が可能",
              gradient: "from-purple-500 to-violet-600"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
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

        {/* 学習フロー */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            🚀 簡単3ステップで始められます
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">アカウント作成</h4>
              <p className="text-gray-600">無料でアカウントを作成してすぐに学習を開始</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">レベル診断</h4>
              <p className="text-gray-600">あなたの現在の英語レベルを診断</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">学習開始</h4>
              <p className="text-gray-600">パーソナライズされた学習プランで効率的に学習</p>
            </div>
          </div>
        </div>

        {/* CTA セクション */}
        <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">今すぐ英語学習を始めましょう</h3>
          <p className="text-xl opacity-90 mb-6">無料でアカウントを作成して、効率的な学習を体験してください</p>
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            <span>無料で始める</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-semibold">
              W
            </div>
            <h4 className="text-xl font-bold">WordMaster</h4>
          </div>
          <p className="text-gray-400 mb-6">
            あなたの英語学習パートナー
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <button className="hover:text-white transition-colors">利用規約</button>
            <button className="hover:text-white transition-colors">プライバシーポリシー</button>
            <button className="hover:text-white transition-colors">お問い合わせ</button>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-gray-500">
            © 2024 WordMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
