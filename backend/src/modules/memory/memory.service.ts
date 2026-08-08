import { documentRepository } from "../documents/document.repository";
import { memoryRepository } from "../memory/memory.repository";
import { mapActionItems, mapDecisions } from "./memory.mapper";
import { llmService } from "../documents/llm/llm.service";
import { extractKeywords } from "../memory/search.util";
import { rank } from "./memory.ranker";
import { buildMemoryContext } from "./memory.context";

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

        return await memoryRepository.search(keywords);
    },

    async ask(question: string) {
        const memories = await this.search(question);

        const keywords = extractKeywords(question);

        const rankedMemories = rank(memories, keywords);

        const bestScore = rankedMemories[0]?.score ?? 0;

        const selectedMemories = rankedMemories.filter(
            (item) => item.score >= bestScore * 0.5
        );

        const context = buildMemoryContext(
            selectedMemories.map((item) => item.memory)
        );

        const result = await llmService.ask(question, context);

        return {
            answer: result.answer,
            citations: selectedMemories.map((item) => ({
                memoryId: item.memory.id,
                documentId: item.memory.documentId,
                type: item.memory.type,
                content: item.memory.content,
                metadata: item.memory.metadata,
            })),
        };
    }
};