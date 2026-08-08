import { Memory } from "./memory.model";

export function buildMemoryContext(memories: Memory[]) {
    return memories
        .map((memory) => {
            let text = `${memory.type.toUpperCase()}: ${memory.content}`;

            if (
                memory.metadata &&
                typeof memory.metadata === "object"
            ) {
                for (const [key, value] of Object.entries(memory.metadata)) {
                    if (value) {
                        text += `\n${key}: ${value}`;
                    }
                }
            }

            return text;
        })
        .join("\n\n");
}