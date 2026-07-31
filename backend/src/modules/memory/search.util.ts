const STOP_WORDS = new Set([
    "why",
    "what",
    "when",
    "where",
    "who",
    "how",
    "did",
    "do",
    "does",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "to",
    "of",
    "for",
    "and",
    "in",
    "on",
    "about",
]);

export function extractKeywords(query: string): string[] {
    return query
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 2)
        .filter((word) => !STOP_WORDS.has(word));
}