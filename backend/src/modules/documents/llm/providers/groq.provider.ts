import "dotenv/config";
import Groq from "groq-sdk";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const groqProvider = {
    async chat(systemPrompt: string, userPrompt: string) {
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
        });

        return response.choices[0]?.message?.content ?? "";
    },
};