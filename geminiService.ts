
import { GoogleGenAI, Type } from "@google/genai";

// FIX: Strictly follow initialization guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getSmartRoutingAdvice = async (productUrl: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this product URL and provide 3 affiliate paths: Long Road, The Alley, The Bridge. URL: ${productUrl}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            paths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  network: { type: Type.STRING },
                  commission: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error fetching smart routing advice:", error);
    return { paths: [] };
  }
};

export const getMinotaurChallengeLore = async (niche: string, difficulty: number) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a cryptic challenge question for an affiliate marketer in the ${niche} niche. Difficulty: ${difficulty}/10. The user must solve this to defeat a Minotaur in the Sovereign Labyrinth. Provide the question and the correct answer.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riddle: { type: Type.STRING },
            hint: { type: Type.STRING },
            correctAnswer: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error fetching minotaur lore:", error);
    return { riddle: "The beast remains silent. The path is blocked.", hint: "Try again later.", options: [] };
  }
};

export const chatWithSovereign = async (history: { role: string; text: string }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are the Maze Architect of Sovereign, a mystical and powerful AI assistant for affiliate marketers. Your tone is authoritative, cryptic but helpful, using metaphors of the labyrinth, gold, and the crown.',
    }
  });

  const lastMessage = history[history.length - 1].text;
  const response = await chat.sendMessage({ message: lastMessage });
  return response.text;
};

export const generateMarketVideo = async (prompt: string) => {
  // FIX: Implement Veo video generation model requirements
  // Check for selected API key
  if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
    await window.aistudio.openSelectKey();
    // Proceed immediately to app after triggering key selection
  }

  // FIX: Create a new GoogleGenAI instance right before making an API call for Veo models
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: `A high-end cinematic advertisement for: ${prompt}. Theme: Golden labyrinth, luxury affiliate marketing.`,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  // FIX: Append API key when fetching from download link as per guidelines
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  return URL.createObjectURL(await response.blob());
};
