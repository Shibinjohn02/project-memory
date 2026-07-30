export const mockProvider = {
    async ask(question: string, context: unknown) {
        return {
            question,
            answer: "This is a mock response generated from the retrieved memories.",
            context,
        };
    },
};