
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Map2D from './components/Map2D';
import Home from './components/Home';
import Documentation from './components/Documentation';
import AlertOverlay from './components/AlertOverlay';
import Header from './components/Header';
import AnalysisSummary from './components/AnalysisSummary';
import ChatBot from './components/ChatBot';
import { MapMode, LayerState, Alert, LanguageCode, SearchResult, PredictionData } from './types';
import { analyzeArea } from './services/geminiService';
import { getTranslation } from './translations';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'dashboard' | 'documentation'>('home');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [layers, setLayers] = useState<LayerState>({
    floodRisk: true,
    constructionZones: true,
    terrain: true,
    landUse: true,
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [searchTarget, setSearchTarget] = useState<SearchResult | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<PredictionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const t = (key: string) => getTranslation(language, key);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newAlert: Alert = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'SYSTEM',
        message: 'Spatial engines active. Pointer analysis enabled.',
        timestamp: new Date(),
        severity: 'info'
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 5));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (result: SearchResult) => {
    setSearchTarget(result);
    runAnalysis(result.lat, result.lon, result.display_name);
  };

  const handleMapClick = (lat: number, lon: number) => {
    setSearchTarget({ lat, lon, display_name: `Point [${lat.toFixed(4)}, ${lon.toFixed(4)}]` });
    runAnalysis(lat, lon, `Point Coordinate Analysis`);
  };

  const runAnalysis = async (lat: number, lon: number, name: string) => {
    setIsAnalyzing(true);
    setCurrentAnalysis(null);
    try {
      const analysis = await analyzeArea(lat, lon, name, language);
      setCurrentAnalysis(analysis);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleLayer = (layer: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleMapClick(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900 text-slate-100">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onSearch={handleSearch} 
        alerts={alerts}
        currentView={view === 'documentation' ? 'home' : view}
        setView={(v) => setView(v)}
      />
      
      <div className="flex flex-1 relative overflow-hidden">
        {view === 'home' ? (
          <Home 
            language={language} 
            onStart={() => setView('dashboard')} 
            onDocs={() => setView('documentation')}
          />
        ) : view === 'documentation' ? (
          <Documentation onBack={() => setView('home')} />
        ) : (
          <>
            <Sidebar 
              layers={layers} 
              toggleLayer={toggleLayer} 
              mapMode={MapMode.TWO_D} 
              setMapMode={() => {}}
              language={language}
              analysis={currentAnalysis}
            />

            <main className="flex-1 relative bg-black">
              <Map2D layers={layers} searchTarget={searchTarget} onMapClick={handleMapClick} />

              {/* Floating HUD */}
              <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 shadow-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{t('live')}</span>
                </div>
                
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-400 italic">
                  {t('click_prompt')}
                </div>

                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={handleMyLocation}
                    title="My Location"
                    className="bg-slate-900/90 hover:bg-slate-800 text-blue-400 p-3 rounded-full shadow-2xl border border-slate-700 transition-all transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-2xl border border-blue-400 transition-all transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {currentAnalysis && (
                <AnalysisSummary 
                  analysis={currentAnalysis} 
                  locationName={searchTarget?.display_name || ''} 
                  language={language}
                  onClose={() => setCurrentAnalysis(null)}
                />
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[1500] flex items-center justify-center">
                  <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl flex flex-col items-center space-y-4 shadow-2xl">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-blue-400 font-bold animate-pulse uppercase tracking-widest text-xs">AI Processing Multi-Layer Data...</p>
                  </div>
                </div>
              )}

              {isChatOpen && (
                <ChatBot 
                  language={language} 
                  currentContext={{
                    locationName: searchTarget?.display_name || 'Current View',
                    analysis: currentAnalysis
                  }}
                  onClose={() => setIsChatOpen(false)}
                />
              )}

              <AlertOverlay alerts={alerts} onDismiss={(id) => setAlerts(prev => prev.filter(a => a.id !== id))} />
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
