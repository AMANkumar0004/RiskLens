
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionData, LanguageCode, SUPPORTED_LANGUAGES, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeArea(
  lat: number, 
  lng: number, 
  locationName: string,
  langCode: LanguageCode = 'en'
): Promise<PredictionData> {
  try {
    const targetLang = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.label || 'English';

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze geospatial safety for ${locationName} at coordinates ${lat}, ${lng}. 
                 Assess Flood Risk, Construction Suitability, Elevation/Terrain, and Land Use.
                 Provide the response in ${targetLang}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            recommendation: { type: Type.STRING },
            metrics: {
              type: Type.OBJECT,
              properties: {
                floodRisk: { type: Type.STRING },
                constructionFeasibility: { type: Type.STRING },
                elevationProfile: { type: Type.STRING },
                landUseType: { type: Type.STRING }
              },
              required: ["floodRisk", "constructionFeasibility", "elevationProfile", "landUseType"]
            }
          },
          required: ["riskLevel", "score", "reasoning", "recommendation", "metrics"]
        }
      }
    });

    const jsonStr = (response.text || "").trim();
    return JSON.parse(jsonStr || "{}");
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
}

export async function getChatResponse(
  history: ChatMessage[],
  currentContext: any,
  langCode: LanguageCode
): Promise<string> {
  const targetLang = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.label || 'English';
  
  // Transform history for Gemini (excluding the last message which we will send)
  const geminiHistory = history.slice(0, -1).map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: 'gemini-3.1-pro-preview', // Upgraded for more complex reasoning and longer context
    history: geminiHistory,
    config: {
      systemInstruction: `You are RiskLens, a world-class Geospatial & Construction Engineering Assistant. 
      Your goal is to provide deep, data-driven insights for construction projects based on specialized AI analysis.

      CURRENT LOCATION CONTEXT:
      - Location Name: ${currentContext.locationName}
      - Risk Level: ${currentContext.analysis?.riskLevel || 'Unknown'}
      - Safety Score: ${currentContext.analysis?.score || 'N/A'}/100
      - Flood Risk: ${currentContext.analysis?.metrics?.floodRisk || 'Unknown'}
      - Construction Feasibility: ${currentContext.analysis?.metrics?.constructionFeasibility || 'Unknown'}
      - Terrain/Elevation: ${currentContext.analysis?.metrics?.elevationProfile || 'Unknown'}
      - Land Use: ${currentContext.analysis?.metrics?.landUseType || 'Unknown'}
      
      INITIAL ANALYSIS SUMMARY:
      - Reasoning: ${currentContext.analysis?.reasoning || 'No initial reasoning provided.'}
      - Recommendation: ${currentContext.analysis?.recommendation || 'No initial recommendation provided.'}

      OPERATIONAL GUIDELINES:
      1. LANGUAGE: You MUST respond in ${targetLang}.
      2. EXPERTISE: Use technical terminology appropriate for civil engineers and urban planners, but explain complex concepts simply if asked.
      3. CONTEXTUAL AWARENESS: Maintain a deep understanding of the conversation history. If the user asks "Why?" or "Tell me more about that," refer back to the specific metrics and reasoning provided above.
      4. INTERACTIVITY: Encourage follow-up questions about specific risks, mitigation strategies, or regulatory compliance.
      5. LIMITATIONS: If the user asks about a location that hasn't been analyzed yet (no context), politely ask them to click a point on the map first.
      
      Be professional, precise, and authoritative.`
    }
  });

  const lastMessage = history[history.length - 1].text;
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text || "I'm sorry, I couldn't process that.";
}
