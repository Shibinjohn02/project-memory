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

            The provided memories are the only source of truth.
            A memory consists of its content and metadata.

            Rules:
            - Do not use outside knowledge.
            - Do not invent, assume, or fabricate information.
            - Do not add explanations, reasons, motivations, or facts that are not
            explicitly supported by the provided memories.
            - Use metadata when it contains information relevant to the question.
            - You may combine information from multiple memories only when the
            relationship between them is explicitly supported by the memories.
            - Do not treat semantic similarity alone as proof that two memories
            are related.
            - Ignore memories that are not relevant to answering the question.
            - If the provided memories do not contain enough information to answer
            the question, clearly state that the available memories do not
            specify the answer.
            - Do not claim that the user's question is missing or invalid unless
            there is actually no question provided.

            Give a concise answer supported directly by the provided memories.
        `;
        
        const userPrompt = `
            Question:
            ${question}

            Relevant memories:
            ${memories
                .map(
                    (memory, index) =>
                        `${index + 1}. [${memory.type}] ${memory.content}
                        Metadata: ${JSON.stringify(memory.metadata)}`
                )
                .join("\n")}
        `;

        return await groqProvider.chat(
            systemPrompt,
            userPrompt
        );
    }
}