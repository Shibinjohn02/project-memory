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

    dates: z.array(z.string()),

    participants: z.array(z.string()),
});

export class GroqMeetingExtractionProvider
    implements MeetingExtractionProvider {

    async extract(
        content: string
    ): Promise<{
        decisions: Decision[];
        actionItems: ActionItem[];
        dates: string[];
        participants: string[];
    }> {

        const systemPrompt = `
            You are a meeting knowledge extraction system.

            Analyze the provided meeting content and extract only information
            explicitly present in the content.

            Return ONLY valid JSON with exactly these fields:

            {
                "decisions": [],
                "actionItems": [],
                "dates": [],
                "participants": []
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

            Dates:
            - Extract only explicit date or deadline expressions.
            - Return the exact date/deadline phrase only.
            - Never return the sentence containing the date.
            - Example:
                "Ankit will update the migration script by September 3."
                → "September 3"

            Participants:
            - Extract only actual person names.
            - A person's name may appear as an owner of an action item or decision.
            - Return only the person's name.
            - Never return a full sentence.
            - Example:
                "Ankit will update the migration script."
                → "Ankit"

            Do not invent or assume missing information.

            For optional fields inside decisions and actionItems, return null when the information is not explicitly available.
            
            For dates and participants, return an empty array when no information is explicitly available.

            Confidence must be a number between 0 and 1.

            For action item status, use only:
            - "pending"
            - "completed"

            If the status is not explicitly mentioned, use "pending".
        `;

        const response = await groqProvider.chat(
            systemPrompt,
            content,
            meetingExtractionSchema
        );

        const cleanedResponse = response
            .replace(/^```json\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();

        const result = meetingExtractionSchema.parse(
            JSON.parse(cleanedResponse)
        );

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

            dates: result.dates,
            participants: result.participants,
        };
    }
}

export const groqMeetingExtractionProvider = new GroqMeetingExtractionProvider();