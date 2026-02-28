
export enum MapMode {
  TWO_D = '2D',
  THREE_D = '3D'
}

export type LanguageCode = 'en' | 'hi' | 'mr' | 'bn' | 'te' | 'ta' | 'gu' | 'kn' | 'ml' | 'pa' | 'mai';

export interface Language {
  code: LanguageCode;
  label: string;
  native: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'mai', label: 'Maithili/Bihari', native: 'मैथिली' },
];

export interface LayerState {
  floodRisk: boolean;
  constructionZones: boolean;
  terrain: boolean;
  landUse: boolean;
}

export interface PredictionData {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  score: number;
  reasoning: string;
  recommendation: string;
  metrics: {
    floodRisk: string;
    constructionFeasibility: string;
    elevationProfile: string;
    landUseType: string;
  }
}

export interface Alert {
  id: string;
  type: 'FLOOD' | 'CONSTRUCTION' | 'SYSTEM';
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error';
}

export interface SearchResult {
  lat: number;
  lon: number;
  display_name: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
