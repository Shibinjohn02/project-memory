import { groqProvider } from "../../documents/llm/providers/groq.provider";
import type { AnswerGeneratorProvider } from "./answer-generator.provider";
import type { Memory } from "../memory.model";

export class GroqAnswerGeneratorProvider
    implements AnswerGeneratorProvider {

    async generate(
        question: string,
        memories: Memory[]
    ): Promise<string> {

        const systemPrompt = `
            You are a memory-based question answering system.

            Answer the user's question using only the provided memories.

            Do not use outside knowledge or make assumptions.

            Do not invent, infer, or fabricate facts that are not present
            in the provided memories.

            If the question is valid but the provided memories do not contain
            enough information to answer it, clearly say that the available
            memories do not specify the answer.

            Do not claim that the user's question is missing or invalid unless
            there is actually no question provided.
        `;
        
        const userPrompt = `
            Question:
            ${question}

            Relevant memories:
            ${memories
                .map((memory, index) =>
                    `${index + 1}. [${memory.type}] ${memory.content}`
                )
                .join("\n")}
        `;

        return await groqProvider.chat(
            systemPrompt,
            userPrompt
        );
    }
}