"use client";

import { Language } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLang === 'zh'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currentLang === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        English
      </button>
    </div>
  );
}

