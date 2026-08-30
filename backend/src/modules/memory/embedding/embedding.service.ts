import type { EmbeddingProvider, EmbeddingTask, } from "./embedding.provider";

export class EmbeddingService {
    constructor(private readonly provider: EmbeddingProvider) { }

    async generate(text: string, task: EmbeddingTask): Promise<number[]> {
        return await this.provider.generateEmbedding(text, task);
    }

    async generateMany(texts: string[], task: EmbeddingTask): Promise<number[][]> {
        return await this.provider.generateEmbeddings(texts, task);
    }
}