import { Extractor } from "./extractor.interface";
import { ActionItem, Decision, MeetingExtractionResult } from "../../modules/documents/document.types";

function extractActionItems(sentences: string[]): ActionItem[] {
  const actionItems: ActionItem[] = [];

  for (const sentence of sentences) {
    const normalized = sentence.trim();

    // Ignore non-action statements
    if (
      /^Reason:/i.test(normalized) ||
      /^Decision:/i.test(normalized)
    ) {
      continue;
    }

    const ownerMatch = normalized.match(
      /^(?:Action Item:\s*)?([A-Z][a-zA-Z]+)\s+(?:will|should|must|need to)\s+(.+)$/i
    );

    if (!ownerMatch) {
      continue;
    }

    actionItems.push({
      owner: ownerMatch[1],
      task: ownerMatch[2].trim(),
      status: "pending",
    });
  }

  return actionItems;
}

function extractDecisions(sentences: string[]): Decision[] {
  return sentences
    .filter((sentence) =>
      /\b(decided|decision|agreed|approved)\b/i.test(sentence)
    )
    .map((sentence) => {
      const parts = sentence.split(/\bbecause\b/i);

      const text = parts[0]
        .replace(/^Decision:\s*/i, "")
        .trim();

      return {
        decision: text
          .replace(/^.*?\b(decided|decision|agreed|approved)\b\s*(to)?\s*/i, "")
          .trim(),
        reason: parts[1]?.trim(),
      };
    });
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