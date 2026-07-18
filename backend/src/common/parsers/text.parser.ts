export const textParser = {
    parse(content: string) {
        const normalizedText = content
            .trim()
            .replace(/\r\n/g, "\n")
            .replace(/\n{2,}/g, "\n\n")
            .replace(/[ \t]+/g, " ");

        return {
            rawText: content,
            normalizedText,
        };
    },
};