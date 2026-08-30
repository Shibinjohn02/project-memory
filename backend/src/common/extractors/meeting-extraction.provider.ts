import { Decision, ActionItem } from "../../modules/documents/document.types";

export interface MeetingExtractionProvider {
    extract(
        content: string
    ): Promise<{
        decisions: Decision[];
        actionItems: ActionItem[];
    }>;
}