
import { GoogleGenAI, Type } from "@google/genai";
import { DesignOutput, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDesignAssistance(prompt: string, lang: Language): Promise<DesignOutput> {
  const modelName = 'gemini-3-flash-preview';
  
  const systemInstruction = lang === Language.AR 
    ? `أنت خبير تصميم بروفايلات شركات عالمي بخبرة 50 عاماً. 
    مهمتك ابتكار "خريطة بناء" لموقع احترافي. 
    يجب أن تحلل النشاط والمكان بعمق. 
    وزع الأقسام بذكاء (Role) بحيث تشمل: 
    - header (الهوية البصرية العلوية)
    - about (قصة الشركة وخبرتها)
    - services (الخدمات والنشاط التجاري)
    - contact (وسائل التواصل)
    - footer (التذييل الاحترافي).
    ركز على الجماليات الفائقة والتوازن اللوني.
    الرد JSON حصراً.`
    : `You are a world-class Corporate Profile expert with 50 years of experience.
    Create a "Build Map" for a professional site.
    Analyze activity and location deeply.
    Assign a 'role' to each section: 'header', 'about', 'services', 'contact', 'footer'.
    Focus on high-end aesthetics.
    Response must be JSON only.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: `User request: ${prompt}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          colors: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              accent: { type: Type.STRING },
              background: { type: Type.STRING },
            },
            required: ["primary", "secondary", "accent", "background"]
          },
          typography: {
            type: Type.OBJECT,
            properties: {
              headingFont: { type: Type.STRING },
              bodyFont: { type: Type.STRING },
            },
            required: ["headingFont", "bodyFont"]
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                keyElements: { type: Type.ARRAY, items: { type: Type.STRING } },
                role: { type: Type.STRING, enum: ['header', 'about', 'services', 'contact', 'footer', 'other'] }
              },
              required: ["name", "description", "keyElements", "role"]
            }
          },
          layoutStyle: { type: Type.STRING, enum: ['Modern', 'Minimal', 'Bold', 'Corporate'] }
        },
        required: ["title", "description", "colors", "typography", "sections", "layoutStyle"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as DesignOutput;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not process design output");
  }
}
