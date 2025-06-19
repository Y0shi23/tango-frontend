'use client';

import { useState } from 'react';
import { Word } from '../app/vocabulary/page';

interface AddWordFormProps {
  onAddWord: (word: Omit<Word, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function AddWordForm({ onAddWord, onCancel }: AddWordFormProps) {
  const [formData, setFormData] = useState({
    english: '',
    japanese: '',
    pronunciation: '',
    example: '',
    difficulty: 2 as 1 | 2 | 3,
    level: 1,
    category: '',
    mastered: false,
    studyStatus: '初学' as '初学' | '学習中' | '習得' | '完了'
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.english.trim()) {
      newErrors.english = '英語は必須です';
    }
    
    if (!formData.japanese.trim()) {
      newErrors.japanese = '日本語は必須です';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'カテゴリは必須です';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddWord(formData);
      setFormData({
        english: '',
        japanese: '',
        pronunciation: '',
        example: '',
        difficulty: 2,
        level: 1,
        category: '',
        mastered: false,
        studyStatus: '初学'
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const predefinedCategories = [
    '基本語彙', 'ビジネス', '社会', '副詞', '数学', '形容詞', '動詞', '名詞', 
    '日常会話', '科学', '技術', 'プログラミング', 'その他'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">新しい単語を追加</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 英語・日本語 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              英語 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.english}
              onChange={(e) => handleInputChange('english', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.english ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="例: vocabulary"
            />
            {errors.english && (
              <p className="mt-1 text-sm text-red-600">{errors.english}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日本語 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.japanese}
              onChange={(e) => handleInputChange('japanese', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.japanese ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="例: 語彙"
            />
            {errors.japanese && (
              <p className="mt-1 text-sm text-red-600">{errors.japanese}</p>
            )}
          </div>
        </div>

        {/* 発音・カテゴリ・難易度 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">発音記号</label>
            <input
              type="text"
              value={formData.pronunciation}
              onChange={(e) => handleInputChange('pronunciation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例: /hoʊm/"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">カテゴリを選択</option>
              {predefinedCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">難易度</label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1}>簡単</option>
              <option value={2}>普通</option>
              <option value={3}>難しい</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">レベル</label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.level}
              onChange={(e) => handleInputChange('level', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1-20"
            />
          </div>
        </div>

        {/* 例文 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">例文</label>
          <textarea
            value={formData.example}
            onChange={(e) => handleInputChange('example', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例: a marriage contract 婚約 - 例文辞典"
          />
        </div>

        {/* 学習状況・習得状況 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">学習状況</label>
            <select
              value={formData.studyStatus}
              onChange={(e) => handleInputChange('studyStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="初学">初学</option>
              <option value="学習中">学習中</option>
              <option value="習得">習得</option>
              <option value="完了">完了</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.mastered}
                onChange={(e) => handleInputChange('mastered', e.target.checked)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">すでに習得済み</span>
            </label>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            単語を追加
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>

      {/* ヒント */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 ヒント</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 発音記号は IPA 記号で入力するとより正確です</li>
          <li>• 例文を追加すると文脈で単語を覚えやすくなります</li>
          <li>• カテゴリで整理すると後で検索しやすくなります</li>
        </ul>
      </div>
    </div>
  );
} 