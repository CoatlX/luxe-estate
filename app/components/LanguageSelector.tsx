'use client';

import React, { useState, useEffect, useRef } from 'react';
import { setLocale } from '../actions/setLocale';

const locales = [
  { code: 'en', label: 'English', icon: 'https://flagcdn.com/w40/us.png' },
  { code: 'es', label: 'Español', icon: 'https://flagcdn.com/w40/es.png' },
  { code: 'fr', label: 'Français', icon: 'https://flagcdn.com/w40/fr.png' },
];

export default function LanguageSelector({ currentLocale = 'en' }: { currentLocale?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedLocale = locales.find(l => l.code === currentLocale) || locales[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = async (code: string) => {
    if (code === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    setIsPending(true);
    setIsOpen(false);
    await setLocale(code);
    setIsPending(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-nordic-dark"
      >
        <img src={selectedLocale.icon} alt={`${selectedLocale.code} flag`} className="w-5 h-auto rounded-sm shadow-sm" />
        <span className="uppercase">{selectedLocale.code}</span>
        <span className="material-icons text-sm text-gray-500">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => handleSelect(locale.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors
                ${currentLocale === locale.code ? 'font-semibold text-mosque bg-mosque/5' : 'text-gray-700'}
              `}
            >
              <img src={locale.icon} alt={`${locale.code} flag`} className="w-5 h-auto rounded-sm shadow-sm" />
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
