
export const mockProvider = {
    async ask(question: string, context: string) {
        if (!context.trim()) {
            return {
                answer: "I couldn't find any relevant memory.",
                citations: [],
            };
        }

        return {
            answer: context,
            citations: [],
        };
    },
};