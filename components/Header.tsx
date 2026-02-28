
import React, { useState, useEffect, useRef } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, SearchResult, Alert } from '../types';
import { getTranslation } from '../translations';

interface HeaderProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onSearch: (result: SearchResult) => void;
  alerts: Alert[];
  currentView: 'home' | 'dashboard';
  setView: (view: 'home' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onSearch, alerts, currentView, setView }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveToHistory = (newQuery: string) => {
    const updatedHistory = [newQuery, ...searchHistory.filter(q => q !== newQuery)].slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleSearch = async (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const searchQuery = typeof e === 'string' ? e : query;
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setIsHistoryOpen(false);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        onSearch({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name
        });
        saveToHistory(searchQuery);
        if (currentView !== 'dashboard') setView('dashboard');
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between z-50 shadow-lg shrink-0">
      <div className="flex items-center space-x-8 shrink-0">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase">
              RiskLens
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => setView('home')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${currentView === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${currentView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            Dashboard
          </button>
        </nav>
      </div>

      <div className="flex-1 max-w-xl px-8 relative" ref={historyRef}>
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={query}
            onFocus={() => setIsHistoryOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-200"
          />
          <div className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-blue-400">
            {isSearching ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </form>

        {isHistoryOpen && searchHistory.length > 0 && (
          <div className="absolute top-full left-8 right-8 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-[60] animate-bounce-in">
            <div className="p-3 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Recent Searches</span>
              <button 
                onClick={clearHistory}
                className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {searchHistory.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(h);
                    handleSearch(h);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center space-x-3"
                >
                  <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">{h}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-300"
        >
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.native}
            </option>
          ))}
        </select>
        
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="bg-slate-800 hover:bg-slate-700 transition-colors p-2 rounded-full border border-slate-700 relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v1m6 0H9" />
            </svg>
            {alerts.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-slate-900"></span>}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-bounce-in z-[60]">
              <div className="p-4 bg-slate-800 border-b border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-widest">{t('notifications')}</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="p-8 text-center text-xs text-slate-500 italic">{t('no_notifications')}</p>
                ) : (
                  alerts.map(a => (
                    <div key={a.id} className="p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${a.severity === 'error' ? 'bg-red-500' : a.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{a.type}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">{a.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
