import type { MemorySearchQuery } from "./memory-search.types";

export interface QueryUnderstandingProvider {
    understand(question: string): Promise<MemorySearchQuery>;
}