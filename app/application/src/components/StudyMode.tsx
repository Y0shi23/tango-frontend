'use client';

import { useState, useEffect } from 'react';
import { Word } from '../app/vocabulary/page';

interface StudyModeProps {
  words: Word[];
  onMarkMastered: (id: number) => void;
}

export default function StudyMode({ words, onMarkMastered }: StudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyWords, setStudyWords] = useState<Word[]>([]);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });

  useEffect(() => {
    // 未習得の単語をシャッフルして学習用配列を作成
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setStudyWords(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
    setStudyStats({ correct: 0, incorrect: 0, total: 0 });
  }, [words]);

  const currentWord = studyWords[currentIndex];

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCorrect = () => {
    setStudyStats(prev => ({
      ...prev,
      correct: prev.correct + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  const handleIncorrect = () => {
    setStudyStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1,
      total: prev.total + 1
    }));
    nextCard();
  };

  const handleMarkMastered = () => {
    if (currentWord) {
      onMarkMastered(currentWord.id);
      // 習得済みにした単語を学習リストから削除
      const newStudyWords = studyWords.filter(word => word.id !== currentWord.id);
      setStudyWords(newStudyWords);
      
      if (newStudyWords.length === 0) {
        // すべての単語を学習完了
        return;
      }
      
      // インデックスを調整
      if (currentIndex >= newStudyWords.length) {
        setCurrentIndex(0);
      }
      setShowAnswer(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < studyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setShowAnswer(false);
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(studyWords.length - 1);
    }
    setShowAnswer(false);
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setStudyStats({ correct: 0, incorrect: 0, total: 0 });
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setStudyWords(shuffled);
  };

  if (studyWords.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">おめでとうございます！</h2>
          <p className="text-lg text-gray-600">すべての単語を習得しました</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          新しい学習を始める
        </button>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">学習する単語がありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">学習モード</h2>
          <button
            onClick={resetSession}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            リセット
          </button>
        </div>
        
        {/* 進捗表示 */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>{currentIndex + 1} / {studyWords.length}</span>
          <div className="flex space-x-4">
            <span className="text-green-600">正解: {studyStats.correct}</span>
            <span className="text-red-600">不正解: {studyStats.incorrect}</span>
            <span>合計: {studyStats.total}</span>
          </div>
        </div>
        
        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / studyWords.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* フラッシュカード */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-6 min-h-[300px] flex flex-col justify-center items-center text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h3 className="text-3xl font-bold text-gray-800">{currentWord.english}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentWord.difficulty === 1 ? 'bg-green-100 text-green-800' :
              currentWord.difficulty === 2 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentWord.difficulty === 1 ? '簡単' : 
               currentWord.difficulty === 2 ? '普通' : '難しい'}
            </span>
          </div>
          
          {currentWord.pronunciation && (
            <p className="text-lg text-gray-600 mb-4">/{currentWord.pronunciation}/</p>
          )}
        </div>

        {showAnswer ? (
          <div className="space-y-4">
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              {currentWord.japanese}
            </div>
            
            {currentWord.example && (
              <div className="bg-white rounded-lg p-4 text-left">
                <p className="text-sm text-gray-600 mb-1">例文:</p>
                <p className="text-gray-800 italic">"{currentWord.example}"</p>
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              カテゴリ: {currentWord.category}
            </div>
          </div>
        ) : (
          <button
            onClick={handleShowAnswer}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
          >
            答えを見る
          </button>
        )}
      </div>

      {/* コントロールボタン */}
      <div className="flex flex-col space-y-4">
        {showAnswer && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleIncorrect}
              className="bg-red-100 text-red-800 py-3 px-6 rounded-lg font-medium hover:bg-red-200 transition-colors"
            >
              ❌ わからない
            </button>
            <button
              onClick={handleCorrect}
              className="bg-green-100 text-green-800 py-3 px-6 rounded-lg font-medium hover:bg-green-200 transition-colors"
            >
              ✅ わかった
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <button
            onClick={previousCard}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            ← 前へ
          </button>
          
          {showAnswer && (
            <button
              onClick={handleMarkMastered}
              className="bg-purple-100 text-purple-800 py-2 px-4 rounded-md hover:bg-purple-200 transition-colors font-medium"
            >
              🎯 習得済みにする
            </button>
          )}
          
          <button
            onClick={nextCard}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            次へ →
          </button>
        </div>
      </div>

      {/* 学習のヒント */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-md">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">📚 学習のコツ</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 音読して発音を確認しましょう</li>
          <li>• 例文と一緒に覚えると定着しやすくなります</li>
          <li>• わからない単語は何度も繰り返し学習しましょう</li>
          <li>• 習得済みボタンは本当に覚えた時だけ押しましょう</li>
        </ul>
      </div>
    </div>
  );
} 