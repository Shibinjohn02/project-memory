import { Memory } from "./memory.model";

export interface RankedMemory {
    memory: Memory;
    score: number;
}

export function rank(memories: Memory[], keywords: string[]): RankedMemory[] {
    return memories
        .map((memory) => {
            let score = 0;

            const content = memory.content.toLowerCase();

            const metadata = JSON.stringify(memory.metadata ?? {}).toLowerCase();

            const searchableText = `${content} ${metadata}`;

            for (const keyword of keywords) {
                const normalizedKeyword = keyword.toLowerCase();

                if (searchableText.includes(normalizedKeyword)) {
                    score += 5;
                }
            }

            // Reward memories matching multiple keywords
            const matchedKeywords = keywords.filter((keyword) =>
                searchableText.includes(keyword.toLowerCase())
            );

            if (matchedKeywords.length > 1) {
                score += matchedKeywords.length * 3;
            }

            if (memory.type === "decision") {
                score += 3;
            } else if (memory.type === "action-item") {
                score += 1;
            }

            return {
                memory,
                score,
            };
        })
        .sort((a, b) => b.score - a.score);
}