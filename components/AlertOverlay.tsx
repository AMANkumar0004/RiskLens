
import React from 'react';
import { Alert } from '../types';

interface AlertOverlayProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const AlertOverlay: React.FC<AlertOverlayProps> = ({ alerts, onDismiss }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 z-[1001] w-full max-w-lg px-4 pointer-events-none">
      {alerts.map((alert) => (
        <div 
          key={alert.id}
          className={`pointer-events-auto flex items-start space-x-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all animate-bounce-in w-full ${
            alert.severity === 'warning' 
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-100' 
              : 'bg-slate-900/40 border-slate-700 text-slate-100'
          }`}
        >
          <div className="flex-shrink-0 mt-1">
            {alert.severity === 'warning' ? (
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">System Alert • {alert.type}</span>
              <span className="text-[10px] opacity-40 font-mono">{alert.timestamp.toLocaleTimeString()}</span>
            </div>
            <p className="text-sm font-medium leading-relaxed mt-1">{alert.message}</p>
          </div>
          <button 
            onClick={() => onDismiss(alert.id)}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(20px) scale(0.9); opacity: 0; }
          70% { transform: translateY(-5px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default AlertOverlay;
