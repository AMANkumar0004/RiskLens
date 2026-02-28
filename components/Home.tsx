
import React from 'react';
import { LanguageCode } from '../types';
import { getTranslation } from '../translations';

interface HomeProps {
  language: LanguageCode;
  onStart: () => void;
  onDocs: () => void;
}

const Home: React.FC<HomeProps> = ({ language, onStart, onDocs }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 selection:bg-blue-500/30 scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)]"></div>
          <img 
            src="https://picsum.photos/seed/geospatial/1920/1080?blur=1" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-5xl px-6 text-center space-y-10">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-4 animate-fade-in backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.3em]">Intelligence Redefined</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
            RISKLENS
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            The ultimate geospatial decision-support system. 
            Harnessing the power of <span className="text-white">Gemini 3.1 Pro</span> to predict risks and optimize construction feasibility in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transform hover:-translate-y-1 active:scale-95"
            >
              Launch Dashboard
              <svg className="inline-block ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={onDocs}
              className="px-10 py-5 bg-slate-900/50 hover:bg-slate-800 text-slate-300 font-bold rounded-2xl border border-slate-800 transition-all backdrop-blur-md"
            >
              Documentation
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-950 py-20 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatCard value="99.9%" label="Prediction Accuracy" />
          <StatCard value="150ms" label="Latency" />
          <StatCard value="50+" label="Global Data Layers" />
          <StatCard value="24/7" label="AI Monitoring" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Engineered for <span className="text-blue-500">Precision</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Our multi-layered approach ensures every decision is backed by comprehensive geospatial data and advanced AI reasoning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="M19 14l-7 7m0 0l-7-7m7 7V3"
            title="Flood Prediction"
            description="Real-time multi-layer analysis of terrain and precipitation data to predict flood risks with high accuracy."
            color="text-red-400"
            bg="bg-red-500/5"
          />
          <FeatureCard 
            icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            title="Construction Feasibility"
            description="Automated assessment of land suitability for construction based on soil, terrain, and regulatory data."
            color="text-amber-400"
            bg="bg-amber-500/5"
          />
          <FeatureCard 
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            title="Gemini AI Integration"
            description="Powered by Gemini 3.1 Pro for complex geospatial reasoning and interactive multi-language assistance."
            color="text-blue-400"
            bg="bg-blue-500/5"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-900/30 py-32 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">How it <span className="text-blue-500">Works</span></h2>
              <p className="text-slate-400 font-medium">A seamless pipeline from raw satellite data to actionable intelligence.</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-slate-800 mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <StepCard number="01" title="Data Ingestion" description="We pull real-time data from global WMS servers and satellite feeds." />
            <StepCard number="02" title="Spatial Analysis" description="Our engine processes terrain, land-use, and environmental layers." />
            <StepCard number="03" title="AI Reasoning" description="Gemini 3.1 Pro analyzes the data to identify risks and opportunities." />
            <StepCard number="04" title="Decision Support" description="You receive a comprehensive report with actionable recommendations." />
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="max-w-7xl mx-auto px-6 py-32 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Meet the <span className="text-blue-500">Developers</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">The visionaries behind RiskLens, dedicated to revolutionizing geospatial intelligence.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Alex Rivers" 
            role="Lead AI Architect" 
            image="https://picsum.photos/seed/dev1/400/400" 
            bio="Expert in LLM integration and geospatial reasoning systems."
          />
          <TeamMember 
            name="Sarah Chen" 
            role="Full-Stack Engineer" 
            image="https://picsum.photos/seed/dev2/400/400" 
            bio="Specializes in high-performance React interfaces and real-time data."
          />
          <TeamMember 
            name="Marcus Thorne" 
            role="GIS Specialist" 
            image="https://picsum.photos/seed/dev3/400/400" 
            bio="Master of spatial data layers and QGIS engine optimization."
          />
          <TeamMember 
            name="Elena Vance" 
            role="Product Designer" 
            image="https://picsum.photos/seed/dev4/400/400" 
            bio="Focused on creating intuitive, mission-critical dashboard experiences."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="relative rounded-[3rem] overflow-hidden bg-blue-600 p-12 md:p-24 text-center space-y-8 shadow-[0_0_100px_rgba(37,99,235,0.2)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
          <h2 className="relative z-10 text-4xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Ready to Build the <br /> Future of Cities?
          </h2>
          <p className="relative z-10 text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join the thousands of engineers and planners using RiskLens to make safer, smarter decisions.
          </p>
          <div className="relative z-10 pt-8">
            <button 
              onClick={onStart}
              className="px-12 py-6 bg-white text-blue-600 font-black rounded-3xl hover:bg-blue-50 transition-all shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">RiskLens</span>
          </div>
          <p className="text-slate-600 text-sm font-medium">© 2026 RiskLens. Built for the future of geospatial intelligence.</p>
          <div className="flex space-x-6">
            <FooterLink label="Twitter" />
            <FooterLink label="LinkedIn" />
            <FooterLink label="GitHub" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: string; title: string; description: string; color: string; bg: string }> = ({ icon, title, description, color, bg }) => (
  <div className={`${bg} border border-slate-800 p-10 rounded-[2.5rem] hover:border-slate-700 transition-all group relative overflow-hidden`}>
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
    <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
      <svg className={`w-7 h-7 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed font-medium">{description}</p>
  </div>
);

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="space-y-2">
    <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">{value}</div>
    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
  </div>
);

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="space-y-6 group">
    <div className="text-6xl font-black text-slate-800 group-hover:text-blue-500/20 transition-colors">{number}</div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  </div>
);

const TeamMember: React.FC<{ name: string; role: string; image: string; bio: string }> = ({ name, role, image, bio }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group text-center space-y-6">
    <div className="relative w-32 h-32 mx-auto rounded-3xl overflow-hidden border-2 border-slate-800 group-hover:border-blue-500 transition-all">
      <img src={image} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold">{name}</h3>
      <div className="text-blue-500 text-xs font-bold uppercase tracking-widest">{role}</div>
    </div>
    <p className="text-slate-500 text-xs leading-relaxed font-medium">{bio}</p>
  </div>
);

const FooterLink: React.FC<{ label: string }> = ({ label }) => (
  <a href="#" className="text-slate-500 hover:text-white text-sm font-bold transition-colors">{label}</a>
);

export default Home;
