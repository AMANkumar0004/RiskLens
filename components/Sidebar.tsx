
import React from 'react';
import { MapMode, LayerState, LanguageCode, PredictionData } from '../types';
import { getTranslation } from '../translations';

interface SidebarProps {
  layers: LayerState;
  toggleLayer: (layer: keyof LayerState) => void;
  mapMode: MapMode;
  setMapMode: (mode: MapMode) => void;
  language: LanguageCode;
  analysis: PredictionData | null;
}

const Sidebar: React.FC<SidebarProps> = ({ layers, toggleLayer, mapMode, setMapMode, language, analysis }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col space-y-8 overflow-y-auto z-40 shrink-0">
      
      {/* Layer Controls */}
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('layers')}</h3>
        <div className="space-y-3">
          <LayerToggle 
            label={t('flood_risk')} 
            isActive={layers.floodRisk} 
            onChange={() => toggleLayer('floodRisk')} 
            color="bg-red-500"
            icon="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
          <LayerToggle 
            label={t('construction')} 
            isActive={layers.constructionZones} 
            onChange={() => toggleLayer('constructionZones')} 
            color="bg-amber-500"
            icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
          <LayerToggle 
            label={t('terrain')} 
            isActive={layers.terrain} 
            onChange={() => toggleLayer('terrain')} 
            color="bg-emerald-500"
            icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
          <LayerToggle 
            label={t('land_use')} 
            isActive={layers.landUse} 
            onChange={() => toggleLayer('landUse')} 
            color="bg-indigo-500"
            icon="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </div>
      </section>

      {/* AI Insights Summary */}
      <section className="mt-auto pt-6 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t('insights')}</h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">{t('flood_prob')}</span>
            <span className={`text-xs font-bold ${analysis ? 'text-red-400' : 'text-slate-600'}`}>{analysis ? analysis.score + '%' : 'N/A'}</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${analysis ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-700'}`}
              style={{ width: analysis ? `${analysis.score}%` : '0%' }}
            ></div>
          </div>
          {analysis && (
            <p className="text-[10px] text-slate-400 leading-tight italic truncate">
              {analysis.reasoning}
            </p>
          )}
        </div>
      </section>
    </aside>
  );
};

const LayerToggle: React.FC<{ label: string; isActive: boolean; onChange: () => void; color: string; icon: string }> = ({ label, isActive, onChange, color, icon }) => (
  <button 
    onClick={onChange}
    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${isActive ? 'bg-slate-800 border-slate-700 shadow-lg translate-x-1' : 'bg-transparent border-transparent text-slate-500 hover:bg-slate-800/50'}`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-1.5 rounded-lg ${isActive ? color : 'bg-slate-800'}`}>
        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>{label}</span>
    </div>
    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>
  </button>
);

export default Sidebar;
