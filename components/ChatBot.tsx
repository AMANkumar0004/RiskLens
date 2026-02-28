
import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { ChatMessage, LanguageCode } from '../types';
import { getTranslation } from '../translations';
import { getChatResponse } from '../services/geminiService';

interface ChatBotProps {
  language: LanguageCode;
  currentContext: any;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ language, currentContext, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = (key: string) => getTranslation(language, key);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      const greet = async () => {
        setIsLoading(true);
        try {
          const greeting = await getChatResponse(
            [{ role: 'user', text: 'Hello, please introduce yourself briefly and ask how you can help with construction in this area.' }],
            currentContext,
            language
          );
          setMessages([{ role: 'model', text: greeting }]);
        } catch (err) {
          setMessages([{ role: 'model', text: "Hello! I am your RiskLens assistant. How can I help you today?" }]);
        } finally {
          setIsLoading(false);
        }
      };
      greet();
    }
  }, [language, currentContext.locationName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const replyText = await getChatResponse([...messages, userMsg], currentContext, language);
      setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to assistant." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-20 right-4 z-[2000] w-96 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col h-[500px] animate-bounce-in overflow-hidden">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="font-bold text-sm">{t('chat_title')}</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <div className="bg-slate-800 w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium italic">Ask me about construction feasibility or flood safety in this area.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {msg.role === 'model' ? (
                <div className="markdown-body">
                  <Markdown>{msg.text}</Markdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-800">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat_placeholder')}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-4 pr-10 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-1.5 text-blue-500 hover:text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
