
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const chatWithShadow = async (prompt: string, history: { role: string; parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Detect if user wants an image (enhanced detection)
  const imageKeywords = ['image', 'génère', 'dessine', 'picture', 'photo', 'visuel', 'illustration', 'montre-moi', 'show me'];
  const wantsImage = imageKeywords.some(keyword => prompt.toLowerCase().includes(keyword));

  if (wantsImage) {
    // We use gemini-2.5-flash-image for image generation as requested
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `High-quality, cinematic, dark aesthetic, manga-style noir, high contrast, focused on strategic depth. Subject: ${prompt}. Artistic style: minimalist, sophisticated, sharp shadows.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    let imageUrl = '';
    let textOutput = '';

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          textOutput += part.text;
        }
      }
    }
    
    return { text: textOutput || "Visual analysis generated.", imageUrl };
  }

  // Regular chat with gemini-3-flash-preview for high-speed strategic reasoning and analysis
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: h.parts 
        })),
        { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 4000 }
    },
  });

  // Extract thoughts if available in the parts (some models provide reasoning)
  let thoughts = "";
  const parts = response.candidates?.[0]?.content?.parts || [];
  for(const part of parts) {
    if ((part as any).thought) {
      thoughts += (part as any).thought;
    }
  }

  return { 
    text: response.text || "I have no data for this query.", 
    thought: thoughts 
  };
};
