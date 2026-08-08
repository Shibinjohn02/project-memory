import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const geminiProvider = {
    async chat(systemPrompt: string, userPrompt: string) {
        const response = await client.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${systemPrompt}\n\n${userPrompt}`,
        });

        return response.text ?? "";
    },
};