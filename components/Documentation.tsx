
import React from 'react';
import { LanguageCode } from '../types';

interface DocumentationProps {
  onBack: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white text-slate-900 selection:bg-blue-100 print:p-0">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </button>
        <button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Export as PDF</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-16 print:py-0">
        <header className="space-y-4 border-b-4 border-blue-600 pb-8">
          <h1 className="text-5xl font-black tracking-tighter uppercase text-slate-950">Project Documentation</h1>
          <p className="text-xl text-slate-500 font-medium">RiskLens — Next-Gen Geospatial Intelligence System</p>
          <div className="flex space-x-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Version 4.2.0</span>
            <span>•</span>
            <span>Last Updated: Feb 2026</span>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
            <span>Executive Summary</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            RiskLens is a high-performance geospatial decision-support platform designed to bridge the gap between complex spatial data and actionable urban planning. By integrating real-time environmental layers with advanced AI reasoning via Gemini 3.1 Pro, the system provides instantaneous assessments of flood risks, construction feasibility, and land-use optimization.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
            <span>Technical Architecture</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">Frontend Stack</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between"><span>Framework</span> <span className="font-bold">React 18+</span></li>
                <li className="flex justify-between"><span>Language</span> <span className="font-bold">TypeScript</span></li>
                <li className="flex justify-between"><span>Styling</span> <span className="font-bold">Tailwind CSS v4</span></li>
                <li className="flex justify-between"><span>Mapping</span> <span className="font-bold">Leaflet.js</span></li>
                <li className="flex justify-between"><span>Icons</span> <span className="font-bold">Lucide React</span></li>
              </ul>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-widest">AI & Data</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex justify-between"><span>Core Model</span> <span className="font-bold">Gemini 3.1 Pro</span></li>
                <li className="flex justify-between"><span>Search API</span> <span className="font-bold">OSM Nominatim</span></li>
                <li className="flex justify-between"><span>Context Window</span> <span className="font-bold">Long-form History</span></li>
                <li className="flex justify-between"><span>Data Format</span> <span className="font-bold">GeoJSON / JSON</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">03</span>
            <span>Core Features</span>
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-red-500 pl-6 space-y-2">
              <h3 className="font-bold text-lg">Flood Prediction Engine</h3>
              <p className="text-sm text-slate-600">Utilizes multi-layer terrain analysis to calculate probability scores for flood events. Factors include elevation profiles, historical data, and real-time precipitation forecasts.</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-6 space-y-2">
              <h3 className="font-bold text-lg">Construction Feasibility Analysis</h3>
              <p className="text-sm text-slate-600">Automated assessment of land parcels for structural development. Analyzes soil stability, slope gradients, and regulatory land-use constraints.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6 space-y-2">
              <h3 className="font-bold text-lg">Interactive AI Assistant</h3>
              <p className="text-sm text-slate-600">A context-aware chatbot powered by Gemini 3.1 Pro that understands the current map view and provides technical engineering advice in multiple languages.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6 space-y-2">
              <h3 className="font-bold text-lg">Data Persistence & Export</h3>
              <p className="text-sm text-slate-600">Local storage integration for search history and full JSON export capabilities for all generated analysis reports.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-3">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">04</span>
            <span>Development Team</span>
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Alex Rivers</p>
              <p className="text-xs text-blue-600 font-bold uppercase">Lead AI Architect</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Sarah Chen</p>
              <p className="text-xs text-blue-600 font-bold uppercase">Full-Stack Engineer</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Marcus Thorne</p>
              <p className="text-xs text-blue-600 font-bold uppercase">GIS Specialist</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Elena Vance</p>
              <p className="text-xs text-blue-600 font-bold uppercase">Product Designer</p>
            </div>
          </div>
        </section>

        <footer className="pt-16 border-t border-slate-200 text-center space-y-4">
          <p className="text-sm text-slate-400 font-medium">© 2026 RiskLens. All rights reserved.</p>
          <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em]">Confidential Technical Document</p>
        </footer>
      </div>
    </div>
  );
};

export default Documentation;
