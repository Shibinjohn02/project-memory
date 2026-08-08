import { groqProvider } from "./providers/groq.provider";
import { MEETING_EXTRACTION_PROMPT, ANSWER_QUESTION_PROMPT } from "./prompts";

export const llmService = {
    async extractMeetingMemory(content: string) {
        return await groqProvider.chat(
            MEETING_EXTRACTION_PROMPT,
            content
        );
    },

    async ask(question: string, context: string) {
        const answer = await groqProvider.chat(
            ANSWER_QUESTION_PROMPT,
            `
                Context:
                ${context}

                Question:
                ${question}
            `
        );

        return {
            answer,
            citations: [],
        };
    },
};