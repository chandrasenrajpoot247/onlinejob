import { GoogleGenerativeAI } from "@google/genai";

// Access API Key from Vercel environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generatePostFromTitle = async (title: string, category: string) => {
  const prompt = `Generate government job details for: "${title}" in category "${category}" in Hindi. Return strictly as JSON.`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/g, "").trim());
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
};

export const fetchLatestJobsFromWeb = async () => {
  const prompt = `List 5 latest Indian government jobs today in JSON format: [{"title": "Name", "category": "Type"}].`;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/g, "").trim());
  } catch (error) {
    return [];
  }
};
