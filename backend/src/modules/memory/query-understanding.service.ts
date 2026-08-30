import type { MemorySearchQuery } from "./memory-search.types";
import type { QueryUnderstandingProvider } from "./query-understanding.provider";

export class QueryUnderstandingService {
    constructor(
        private readonly provider: QueryUnderstandingProvider
    ) {}

    async understand(question: string): Promise<MemorySearchQuery> {
        return await this.provider.understand(question);
    }
}