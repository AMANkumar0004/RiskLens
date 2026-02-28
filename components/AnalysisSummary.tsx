
import React from 'react';
import { PredictionData, LanguageCode } from '../types';
import { getTranslation } from '../translations';

interface AnalysisSummaryProps {
  analysis: PredictionData;
  locationName: string;
  language: LanguageCode;
  onClose: () => void;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ analysis, locationName, language, onClose }) => {
  const t = (key: string) => getTranslation(language, key);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      location: locationName,
      timestamp: new Date().toISOString(),
      analysis: analysis
    }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `risklens_analysis_${locationName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1100] w-full max-w-2xl px-4 animate-bounce-in pointer-events-none">
      <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-2xl border border-slate-700 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[75vh] flex flex-col transition-all">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-800/40">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t('summary_title')}</h2>
            <p className="text-xs text-slate-300 truncate max-w-sm font-medium mt-0.5">{locationName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleExport}
              title="Export Data"
              className="flex items-center space-x-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 transition-all px-3 py-1.5 rounded-xl border border-blue-500/30 hover:border-blue-500/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-wider">Export</span>
            </button>
            <button 
              onClick={onClose} 
              className="flex items-center space-x-1.5 bg-slate-700/50 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-all px-3 py-1.5 rounded-xl border border-slate-600 hover:border-red-500/50 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">{t('close')}</span>
              <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard label="Flood" value={analysis.metrics.floodRisk} color="text-red-400" bgColor="bg-red-500/10" />
            <MetricCard label="Construction" value={analysis.metrics.constructionFeasibility} color="text-amber-400" bgColor="bg-amber-500/10" />
            <MetricCard label="Terrain" value={analysis.metrics.elevationProfile} color="text-emerald-400" bgColor="bg-emerald-500/10" />
            <MetricCard label="Land Use" value={analysis.metrics.landUseType} color="text-indigo-400" bgColor="bg-indigo-500/10" />
          </div>

          <div className={`p-4 rounded-2xl border ${analysis.riskLevel === 'CRITICAL' || analysis.riskLevel === 'HIGH' ? 'bg-red-950/20 border-red-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  analysis.riskLevel === 'CRITICAL' || analysis.riskLevel === 'HIGH' ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {analysis.riskLevel} RISK
                </span>
                <span className="text-[10px] font-mono text-slate-400">INDEX: {analysis.score}/100</span>
              </div>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">{analysis.reasoning}</p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Guidance</h4>
            </div>
            <p className="text-sm text-emerald-50/80 italic leading-relaxed">{analysis.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; color: string; bgColor: string }> = ({ label, value, color, bgColor }) => (
  <div className={`${bgColor} p-3 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center shadow-inner`}>
    <span className="text-[9px] uppercase tracking-tighter text-slate-500 mb-1 font-bold">{label}</span>
    <span className={`text-[11px] font-bold leading-tight ${color}`}>{value}</span>
  </div>
);

export default AnalysisSummary;
