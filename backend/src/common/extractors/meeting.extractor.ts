import { Extractor } from "./extractor.interface";
import { MeetingExtractionResult } from "../../modules/documents/document.types";
import { groqMeetingExtractionProvider } from "./groq-meeting-extraction.provider";

export const meetingExtractor: Extractor = {
  async extract(content: string): Promise<MeetingExtractionResult> {
    const normalizedContent = content.trim();

    const lines = normalizedContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const paragraphs = normalizedContent
      .split("\n\n")
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const sentences = paragraphs.flatMap((paragraph) =>
      paragraph
        .split(/[.!?]+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean)
    );

    const {
      decisions,
      actionItems,
      dates,
      participants,
    } = await groqMeetingExtractionProvider.extract(normalizedContent);

    return {
      content: normalizedContent,
      lines,
      paragraphs,
      sentences,
      actionItems,
      decisions,
      dates,
      participants,
    };
  },
};