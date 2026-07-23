import { MeetingExtractionResult } from "../../modules/documents/document.types";

export const knowledgeBuilder = {
    build(extraction: MeetingExtractionResult) {
        return {
            summary: extraction.content,
            actionItems: extraction.actionItems,
            decisions: extraction.decisions,
            participants: extraction.participants,
            dates: extraction.dates,
        };
    },
};