import type { EmbeddingProvider, EmbeddingTask, } from "./embedding.provider";
interface JinaEmbeddingResponse {
    data: Array<{
        embedding: number[];
    }>;
}

export class JinaEmbeddingProvider implements EmbeddingProvider {
    private readonly apiUrl = "https://api.jina.ai/v1/embeddings";

    async generateEmbedding(text: string, task: EmbeddingTask): Promise<number[]> {
        const embeddings = await this.generateEmbeddings([text], task);

        return embeddings[0];
    }

    async generateEmbeddings(texts: string[], task: EmbeddingTask): Promise<number[][]> {
        const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.JINAAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "jina-embeddings-v3",
                input: texts,
                task,
            }),
        });


        if (!response.ok) {
            const error = await response.text();

            throw new Error(
                `Jina embedding request failed: ${response.status} ${error}`
            );
        }

        const result =
            (await response.json()) as JinaEmbeddingResponse;

        const embeddings = result.data.map((item) => item.embedding);

        if (embeddings.length !== texts.length) {
            throw new Error(
                `Expected ${texts.length} embeddings, received ${embeddings.length}.`
            );
        }

        for (const embedding of embeddings) {
            if (embedding.length !== 1024) {
                throw new Error(
                    `Expected 1024-dimensional embedding, received ${embedding.length}.`
                );
            }
        }

        return embeddings;
    }
}