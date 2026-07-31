import { documentRepository } from "../documents/document.repository";
import { mapActionItems, mapDecisions } from "./memory.mapper";
import { llmService } from "../documents/llm/llm.service";
import { extractKeywords } from "../memory/search.util";


export const memoryService = {
    async getMemoryById(id: number) {
        const memory = await documentRepository.findMemoryById(id);

        if (!memory) {
            throw new Error("Document not found.");
        }

        return {
            documentId: memory.id,
            decisions: mapDecisions(memory.decisions ?? []),
        };
    },

    async getActionItemsById(id: number) {
        const document = await documentRepository.findActionItemsById(id);

        if (!document) {
            throw new Error("Document not found.");
        }

        return {
            documentId: document.id,
            actionItems: mapActionItems(document.actionItems ?? []),
        };
    },

    async getTimelineById(id: number) {
        const document = await documentRepository.findTimelineById(id);

        if (!document) {
            throw new Error("Document not found.");
        }

        const events = [
            ...mapDecisions(document.decisions ?? []).map((item) => ({
                type: "decision",
                ...item,
            })),

            ...mapActionItems(document.actionItems ?? []).map((item) => ({
                type: "action-item",
                ...item,
            })),
        ];

        return {
            documentId: document.id,
            events,
        };
    },

    async search(question: string) {
        const keywords = extractKeywords(question);

        return await documentRepository.search(keywords);
    },

    async ask(question: string) {
        const memories = await this.search(question);

        return await llmService.ask(question, memories);
    }
};