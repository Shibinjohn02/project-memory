import type { EmbeddingProvider } from "./embedding.provider";

export class EmbeddingService {
    constructor(private readonly provider: EmbeddingProvider) { }

    async generate(text: string): Promise<number[]> {
        return await this.provider.generateEmbedding(text);
    }

    async generateMany(texts: string[]): Promise<number[][]> {
        return await this.provider.generateEmbeddings(texts);
    }
}