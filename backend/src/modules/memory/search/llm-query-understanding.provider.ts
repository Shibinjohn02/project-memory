import { groqProvider } from "../../documents/llm/providers/groq.provider";
import type { MemorySearchQuery } from "./memory-search.types";
import type { QueryUnderstandingProvider } from "./query-understanding.provider";

export class LLMQueryUnderstandingProvider
    implements QueryUnderstandingProvider {

    async understand(question: string): Promise<MemorySearchQuery> {
        const systemPrompt = `
            You are a query understanding system for a memory search application.

            Analyze the user's question and return ONLY valid JSON.

            The JSON must have exactly these fields:
            - searchQuery: a concise search query containing the important meaning of the user's question.
            - memoryType: one of "decision", "action-item", "fact", "risk", "constraint", "open-question", or null.
            - status: the status being asked for, such as "pending", "completed", or "in-progress", or null if no status is specified.
            - owner: the person explicitly associated with the requested memory, or null.

            Use memoryType only when the question clearly asks about a specific type of memory.
            Otherwise return null.

            Always provide a meaningful searchQuery when the user asks a valid question.
            Do not return an empty searchQuery.

            For every question, preserve all important entities, names,
            subjects, and constraints from the user's question in searchQuery.

            The searchQuery must contain the specific target of the question
            whenever one is explicitly mentioned.

            Do not remove person names, project names, technology names,
            dates, statuses, or other identifying terms that are important
            for finding the relevant memory.

            The searchQuery should be optimized for retrieving the relevant
            memory, not simply summarize the question.

            Examples:

            Question: "Which database did we choose?"
            Output: {"searchQuery":"database chosen","memoryType":"decision","status":null}

            Question: "What action items are pending?"
            Output: {"searchQuery":"action items","memoryType":"action-item","status":"pending"}

            Question: "What action items are there?"
            Output: {"searchQuery":"action items","memoryType":"action-item","status":null}

            Question: "Tell me about PostgreSQL"
            Output: {"searchQuery":"PostgreSQL","memoryType":null,"status":null}

            Question: "Why did we choose PostgreSQL?"
            Output: {"searchQuery":"reason for choosing PostgreSQL","memoryType":null,"status":null}

            Question: "What does Ankit need to do?"
            Output: {"searchQuery":"action item","memoryType":"action-item","status":null,"owner":"Ankit"}
        `;
        
        const response = await groqProvider.chat(
            systemPrompt,
            question
        );

        return JSON.parse(response) as MemorySearchQuery;
    }
}