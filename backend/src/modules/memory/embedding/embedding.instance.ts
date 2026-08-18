import { EmbeddingService } from "./embedding.service";
import { JinaEmbeddingProvider } from "./jina.embedding.provider";

const jinaEmbeddingProvider = new JinaEmbeddingProvider();

export const embeddingService = new EmbeddingService(
    jinaEmbeddingProvider
);