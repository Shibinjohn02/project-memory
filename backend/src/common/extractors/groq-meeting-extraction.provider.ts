import { Decision, ActionItem } from "../../modules/documents/document.types";
import { MeetingExtractionProvider } from "./meeting-extraction.provider";
import { groqProvider } from "../../modules/documents/llm/providers/groq.provider";
import { z } from "zod";

const meetingExtractionSchema = z.object({
    decisions: z.array(
        z.object({
            decision: z.string(),
            reason: z.string().nullable(),
            owner: z.string().nullable(),
            confidence: z.number().min(0).max(1).optional(),
        })
    ),

    actionItems: z.array(
        z.object({
            task: z.string(),
            owner: z.string().nullable(),
            status: z.enum(["pending", "completed"]),
            dueDate: z.string().nullable(),
            confidence: z.number().min(0).max(1).optional(),
        })
    ),
});

export class GroqMeetingExtractionProvider
    implements MeetingExtractionProvider {

    async extract(
        content: string
    ): Promise<{
        decisions: Decision[];
        actionItems: ActionItem[];
    }> {

        const systemPrompt = `
            You are a meeting knowledge extraction system.

            Analyze the provided meeting content and extract only information
            explicitly present in the content.

            Return ONLY valid JSON with exactly these fields:

            {
                "decisions": [],
                "actionItems": []
            }

            Each decision must contain:
            - decision
            - reason
            - owner
            - confidence

            Each action item must contain:
            - task
            - owner
            - status
            - dueDate
            - confidence

            Do not invent or assume missing information.

            If a field is not explicitly available, return null.

            Confidence must be a number between 0 and 1.

            For action item status, use only:
            - "pending"
            - "completed"

            If the status is not explicitly mentioned, use "pending".
        `;

        const response = await groqProvider.chat(
            systemPrompt,
            content
        );

        const result = meetingExtractionSchema.parse(JSON.parse(response));

        return {
            decisions: result.decisions.map((decision) => ({
                decision: decision.decision,
                reason: decision.reason ?? undefined,
                owner: decision.owner ?? undefined,
                confidence: decision.confidence,
            })),

            actionItems: result.actionItems.map((actionItem) => ({
                task: actionItem.task,
                owner: actionItem.owner ?? undefined,
                status: actionItem.status,
                dueDate: actionItem.dueDate ?? undefined,
                confidence: actionItem.confidence,
            })),
        };
    }
}

export const groqMeetingExtractionProvider = new GroqMeetingExtractionProvider();