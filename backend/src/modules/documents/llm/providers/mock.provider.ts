
function findBestSentence(content: string, question: string): string {
    const normalizedQuestion = question
        .toLowerCase()
        .replace(/\bchoose\b/g, "decide")
        .replace(/\bchosen\b/g, "decide")
        .replace(/\bselected\b/g, "decide");

    const keywords = normalizedQuestion
        .split(/\W+/)
        .filter((word) => word.length > 2);

    const sentences = content
        .split(/[.!?]/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

    let bestSentence = content;
    let bestScore = -1;

    for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase();

        let score = 0;

        for (const keyword of keywords) {
            if (lowerSentence.includes(keyword)) {
                score++;
            }
        }

        // Give higher priority to decision sentences
        if (
            /\b(decided|decision|agreed|approved|use|using)\b/i.test(sentence)
        ) {
            score += 2;
        }

        if (score > bestScore) {
            bestScore = score;
            bestSentence = sentence;
        }
    }

    return bestSentence;
}

export const mockProvider = {
    async ask(question: string, memories: any[]) {
        if (memories.length === 0) {
            return {
                answer: "I couldn't find any relevant memory.",
                sources: [],
            };
        }

        const firstMemory = memories[0];

        const answer = firstMemory
            ? findBestSentence(firstMemory.content, question)
            : "I couldn't find any relevant memory.";

        return {
            answer,
            sources: memories.map((memory) => ({
                documentId: memory.id,
                source: memory.source,
                originalFilename: memory.originalFilename,
            })),
        };
    },
};