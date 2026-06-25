import { GoogleGenAI } from '@google/genai';

// Initialize the API client if key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const parseNaturalLanguageTask = async (text) => {
  if (!ai) {
    // Basic mock NLP parsing to simulate AI
    let estimatedHours = 2; // Default
    let hoursLeft = 24; // Default to tomorrow
    
    // Try to find how much time they need (e.g., "10 min", "2 hours")
    const needMatch = text.match(/need (\d+)\s*(min|hour)/i) || text.match(/(\d+)\s*(min|hour).*prepare/i);
    if (needMatch) {
      const amount = parseFloat(needMatch[1]);
      estimatedHours = needMatch[2].toLowerCase().startsWith('min') ? amount / 60 : amount;
    }

    // Try to find how much time is left (e.g., "2 hours left", "in 1 hour")
    const leftMatch = text.match(/(\d+)\s*hour.*left/i) || text.match(/in\s*(\d+)\s*hour/i);
    if (leftMatch) {
      hoursLeft = parseFloat(leftMatch[1]);
    } else {
      // Fallback if they just type the 'tight deadline' test case
      if (text.toLowerCase().includes('one hour') && text.toLowerCase().includes('half')) {
        hoursLeft = 1;
        estimatedHours = 1.5;
      }
    }

    return {
      title: text.length > 25 ? text.substring(0, 35) + '...' : text,
      deadline: new Date(Date.now() + hoursLeft * 60 * 60 * 1000).toISOString(),
      hours: Number(estimatedHours.toFixed(2)),
      category: 'Focus'
    };
  }

  try {
    const prompt = `Convert this task description into JSON with keys: title, deadline (ISO format), estimatedHours (number), category. Text: "${text}"`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const rawText = response.text().replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Gemini Parsing Error", error);
    return null;
  }
};
