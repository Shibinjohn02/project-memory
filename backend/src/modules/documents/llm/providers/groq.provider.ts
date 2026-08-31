import "dotenv/config";
import Groq from "groq-sdk";
import { z } from "zod";

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const groqProvider = {
    async chat(
        systemPrompt: string,
        userPrompt: string,
        schema?: z.ZodType
    ) {
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

            ...(schema && {
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "structured_output",
                        schema: z.toJSONSchema(schema),
                    },
                },
            }),
        });
        
        return response.choices[0]?.message?.content ?? "";
    },
};