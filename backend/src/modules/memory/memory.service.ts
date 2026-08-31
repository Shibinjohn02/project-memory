import { documentRepository } from "../documents/document.repository";
import { memoryRepository } from "../memory/memory.repository";
import { llmService } from "../documents/llm/llm.service";
import { extractKeywords } from "../memory/search.util";
import { rank } from "./memory.ranker";
import { buildMemoryContext } from "./memory.context";
import { embeddingService } from "./embedding/embedding.instance";
import { QueryUnderstandingService } from "./search/query-understanding.service";
import { LLMQueryUnderstandingProvider } from "./search/llm-query-understanding.provider";
import { answerGenerator } from "./answer/answer-generator.instance";

const queryUnderstandingService = new QueryUnderstandingService(
    new LLMQueryUnderstandingProvider()
);

export const memoryService = {
    async getTimelineById(id: number) {
        const document = await documentRepository.findById(id);

        if (!document) {
            throw new Error("Document not found.");
        }

        const memories = await memoryRepository.findByDocumentId(id);

        return {
            documentId: document.id,
            events: memories.map((memory) => ({
                id: memory.id,
                type: memory.type,
                content: memory.content,
                metadata: memory.metadata
            })),
        };
    },

    async search(question: string) {
        const keywords = extractKeywords(question);

        return await memoryRepository.search(keywords);
    },

    async semanticSearch(question: string) {
        const understoodQuery = await queryUnderstandingService.understand(question);

        const embedding = await embeddingService.generate(
            understoodQuery.searchQuery,
            "retrieval.query"
        );

        return await memoryRepository.semanticSearch(
            embedding,
            5,
            0.8,
            understoodQuery.memoryType ?? undefined,
            understoodQuery.status,
            understoodQuery.owner ?? undefined
        );
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
    },

    async answer(question: string) {
        const understoodQuery = await queryUnderstandingService.understand(question);

        const embedding =
            await embeddingService.generate(
                understoodQuery.searchQuery,
                "retrieval.query"
            );

        const memories =
            await memoryRepository.semanticSearch(
                embedding,
                5,
                0.8,
                understoodQuery.memoryType ?? undefined,
                understoodQuery.status
            );

        console.log("ANSWER MEMORIES:", JSON.stringify(memories, null, 2));

        if (memories.length === 0) {
            return "I couldn't find any relevant information in memory.";
        }

        return await answerGenerator.generate(
            question,
            memories
        );
    }
};