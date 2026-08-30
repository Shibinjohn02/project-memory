import { MeetingExtractionResult } from "../../modules/documents/document.types";

export interface Extractor {
  extract(content: string): Promise<MeetingExtractionResult>;
}
