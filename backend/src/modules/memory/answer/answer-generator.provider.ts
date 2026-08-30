import type { Memory } from "../memory.model";

export interface AnswerGeneratorProvider {
    generate(
        question: string,
        memories: Memory[]
    ): Promise<string>;
}