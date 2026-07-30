import { geminiProvider } from "./providers/gemini.provider";
import { mockProvider } from "./providers/mock.provider";
import { MEETING_EXTRACTION_PROMPT } from "./prompts";

export const llmService = {
  async extractMeetingMemory(content: string) {
    return await geminiProvider.chat(
      MEETING_EXTRACTION_PROMPT,
      content
    );
  },

  async ask(question: string, context: unknown) {
    return await mockProvider.ask(question, context);
  },
};

