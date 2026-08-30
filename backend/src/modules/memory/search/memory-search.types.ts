import type { MemoryType } from "../memory.types";

export interface MemorySearchQuery {
    searchQuery: string;
    memoryType: MemoryType | null;
    status?: string;
}