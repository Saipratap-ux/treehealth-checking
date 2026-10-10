import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'pills' | 'compact';
  className?: string;
}

const LANGUAGES: { code: Language; label: string; script: string }[] = [
  { code: 'en', label: 'English', script: 'English' },
  { code: 'or', label: 'Odia', script: 'ଓଡ଼ିଆ' },
  { code: 'hi', label: 'Hindi', script: 'हिन्दी' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-2xl border border-gray-200/80 ${className}`}>
        {LANGUAGES.map((item) => (
          <button
            key={item.code}
            onClick={() => setLanguage(item.code)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              language === item.code
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            <span>{item.script}</span>
            {item.code !== 'en' && <span className="text-[10px] opacity-80">({item.label})</span>}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 transition active:scale-95 shadow-xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Change Language / ଭାଷା ବଦଳାନ୍ତୁ / भाषा बदलें"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="font-semibold">{currentLang.script}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-emerald-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 divide-y divide-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden border border-gray-100">
          <div className="px-3 py-2 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
            <span>Select Language</span>
            <span>ଭାଷା / भाषा</span>
          </div>
          <div className="p-1 space-y-0.5">
            {LANGUAGES.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-gray-700 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.script}</span>
                    <span className="text-[10px] text-gray-400">{item.label}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
