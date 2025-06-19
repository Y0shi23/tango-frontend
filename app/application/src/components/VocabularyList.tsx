'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Word } from '../app/vocabulary/page';

interface VocabularyListProps {
  words: Word[];
  onUpdateWord: (id: number, updatedWord: Partial<Word>) => void;
  onDeleteWord: (id: number) => void;
}

export default function VocabularyList({ words, onUpdateWord, onDeleteWord }: VocabularyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedWords, setSelectedWords] = useState<Set<number>>(new Set());
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredWords = words.filter(word => {
    const matchesSearch = word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         word.japanese.includes(searchTerm) ||
                         (word.category && word.category.includes(searchTerm));
    const matchesCategory = filterCategory === 'all' || word.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || word.difficulty.toString() === filterDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedWords = [...filteredWords].sort((a, b) => {
    let aValue: any = a[sortField as keyof Word];
    let bValue: any = b[sortField as keyof Word];
    
    if (sortField === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const categories = Array.from(new Set(words.map(word => word.category)));
  const difficulties = [1, 2, 3];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedWords(new Set(sortedWords.map(word => word.id)));
    } else {
      setSelectedWords(new Set());
    }
  };

  const handleSelectWord = (wordId: number, checked: boolean) => {
    const newSelected = new Set(selectedWords);
    if (checked) {
      newSelected.add(wordId);
    } else {
      newSelected.delete(wordId);
    }
    setSelectedWords(newSelected);
  };

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const getStudyStatusStyle = (status: string) => {
    switch (status) {
      case '初学': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case '学習中': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case '習得': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case '完了': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* ヘッダーとフィルター */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">単語一覧</h2>
          <div className="text-sm text-gray-500">
            {selectedWords.size > 0 && `${selectedWords.size}件選択中 / `}
            {sortedWords.length}件表示中（全{words.length}件）
          </div>
        </div>
        
        {/* 検索・フィルタリング */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">検索</label>
            <input
              type="text"
              placeholder="単語を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">すべて</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">難易度</label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="all">すべて</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty.toString()}>
                  {difficulty === 1 ? '簡単' : difficulty === 2 ? '普通' : '難しい'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedWords.size === sortedWords.length && sortedWords.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th 
                className="p-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('english')}
              >
                単語 {sortField === 'english' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">発音</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">主な意味</th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">例文</th>
              <th 
                className="p-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('level')}
              >
                レベル {sortField === 'level' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="p-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('createdAt')}
              >
                登録日 {sortField === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3 text-left text-sm font-medium text-gray-700">学習状況</th>
            </tr>
          </thead>
          <tbody>
            {sortedWords.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  該当する単語が見つかりません。
                </td>
              </tr>
            ) : (
              sortedWords.map((word, index) => (
                <tr 
                  key={word.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedWords.has(word.id)}
                      onChange={(e) => handleSelectWord(word.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-gray-900">
                      <Link 
                        href={`/context/${encodeURIComponent(word.english)}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {word.english}
                      </Link>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{word.pronunciation}</span>
                      {word.pronunciation && (
                        <button
                          onClick={() => playPronunciation(word.english)}
                          className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700"
                          title="発音を聞く"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={word.japanese}>
                      {word.japanese}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-600 max-w-xs">
                      {word.example && (
                        <div>
                          <div className="font-medium text-gray-900">{word.example.split(' ')[0]} {word.example.split(' ')[1]}</div>
                          {word.example.includes(' - ') && (
                            <div className="text-xs text-blue-600 mt-1">
                              {word.example.split(' - ')[1]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center justify-center w-8 h-6 text-sm font-bold text-gray-800 bg-white border border-gray-300 rounded">
                      {word.level}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-gray-600">
                      {formatDate(word.createdAt)}
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        const statuses: ('初学' | '学習中' | '習得' | '完了')[] = ['初学', '学習中', '習得', '完了'];
                        const currentIndex = statuses.indexOf(word.studyStatus);
                        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                        onUpdateWord(word.id, { studyStatus: nextStatus });
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${getStudyStatusStyle(word.studyStatus)}`}
                    >
                      {word.studyStatus}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 