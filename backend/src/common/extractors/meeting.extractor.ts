import { Extractor } from "./extractor.interface";
import { MeetingExtractionResult } from "../../modules/documents/document.types";


function extractActionItems(sentences: string[]) {
  return sentences
    .filter((sentence) =>
      /\b(will|should|must|need to)\b/i.test(sentence)
    )
    .map((sentence) =>
      sentence
        .replace(/\b(will|should|must|need to)\b/i, "")
        .trim()
    );
}

function extractDecisions(sentences: string[]) {
  return sentences.filter((sentence) =>
    /\b(decided|decision|agreed|approved)\b/i.test(sentence)
  );
}

function extractDates(sentences: string[]) {
  return sentences.filter((sentence) =>
    /\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|next week|next month)\b/i.test(
      sentence
    )
  );
}

function extractParticipants(sentences: string[]) {
  return sentences.filter((sentence) =>
    /\b[A-Z][a-z]+\b/.test(sentence)
  );
}

export const meetingExtractor: Extractor = {
  extract(content: string): MeetingExtractionResult {
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

    const actionItems = extractActionItems(sentences);

    const decisions = extractDecisions(sentences);

    const dates = extractDates(sentences);

    const participants = extractParticipants(sentences);

    return {
      content: normalizedContent,
      lines,
      paragraphs,
      sentences,
      actionItems,
      decisions,
      dates,
      participants
    };
  },
};