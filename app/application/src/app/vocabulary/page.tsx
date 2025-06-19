'use client';

import { useState, useEffect } from 'react';
import VocabularyList from '../../components/VocabularyList';
import AddWordForm from '../../components/AddWordForm';
import StudyMode from '../../components/StudyMode';
import { apiClient } from '../../lib/api';

export interface Word {
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
  createdAt: Date;
}

export default function VocabularyPage() {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'study'>('list');
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // APIから単語データを取得
  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.getWords({ limit: 100 });
        
        // APIレスポンスをWord形式に変換
        const convertedWords: Word[] = response.words.map(apiWord => ({
          id: apiWord.id,
          english: apiWord.english,
          japanese: apiWord.japanese,
          pronunciation: apiWord.pronunciation,
          example: apiWord.example,
          difficulty: apiWord.difficulty, // 数値として直接使用
          level: apiWord.level,
          category: apiWord.category,
          mastered: apiWord.mastered,
          studyStatus: apiWord.studyStatus,
          createdAt: new Date(apiWord.createdAt)
        }));
        
        setWords(convertedWords);
      } catch (err) {
        console.error('Failed to fetch words:', err);
        setError('単語データの取得に失敗しました。');
        
        // エラーの場合はモックデータを使用
        const mockWords: Word[] = [
          {
            id: 1,
            english: 'home',
            japanese: '住活の場としての家、わが家、自宅',
            pronunciation: '/hoʊm/',
            example: '',
            difficulty: 1,
            level: 1,
            category: '基本語彙',
            mastered: false,
            studyStatus: '初学',
            createdAt: new Date('2021-08-27')
          },
          {
            id: 2,
            english: 'department',
            japanese: '(会社・企業などの組織上の)部門、...部',
            pronunciation: '/dɪˈpɑːrtmənt/',
            example: 'Revenue department 税務課 - Wikipedia日英京都関連文書対訳コーパス',
            difficulty: 2,
            level: 1,
            category: 'ビジネス',
            mastered: false,
            studyStatus: '初学',
            createdAt: new Date('2021-08-27')
          }
        ];
        setWords(mockWords);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const addWord = (word: Omit<Word, 'id' | 'createdAt'>) => {
    const newWord: Word = {
      ...word,
      id: Date.now(),
      createdAt: new Date()
    };
    setWords([...words, newWord]);
  };

  const updateWord = (id: number, updatedWord: Partial<Word>) => {
    setWords(words.map(word => 
      word.id === id ? { ...word, ...updatedWord } : word
    ));
  };

  const deleteWord = (id: number) => {
    setWords(words.filter(word => word.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">英単語学習アプリ</h1>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              単語一覧
            </button>
            <button
              onClick={() => setCurrentView('add')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'add'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              単語追加
            </button>
            <button
              onClick={() => setCurrentView('study')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'study'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              学習モード
            </button>
          </nav>
        </header>

        {/* ローディング状態 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">単語データを読み込んでいます...</p>
          </div>
        )}

        {/* エラー状態 */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">エラーが発生しました</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <p className="text-sm text-red-700 mt-1">現在はサンプルデータを表示しています。</p>
              </div>
            </div>
          </div>
        )}

        {/* メインコンテンツ */}
        {!loading && (
          <main>
            {currentView === 'list' && (
              <VocabularyList 
                words={words} 
                onUpdateWord={updateWord}
                onDeleteWord={deleteWord}
              />
            )}
            {currentView === 'add' && (
              <AddWordForm 
                onAddWord={addWord}
                onCancel={() => setCurrentView('list')}
              />
            )}
            {currentView === 'study' && (
              <StudyMode 
                words={words.filter(word => !word.mastered)}
                onMarkMastered={(id: number) => updateWord(id, { mastered: true })}
              />
            )}
          </main>
        )}
      </div>
    </div>
  );
} 