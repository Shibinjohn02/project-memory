export type EmbeddingTask =
    | "retrieval.query"
    | "retrieval.passage";

export interface EmbeddingProvider {
    generateEmbedding(text: string, task: EmbeddingTask): Promise<number[]>;

    generateEmbeddings(texts: string[], task: EmbeddingTask): Promise<number[][]>;
}