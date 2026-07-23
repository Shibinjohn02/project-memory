export type DocumentSource =
  | "meeting"
  | "jira"
  | "pull-request"
  | "commit";

export interface UploadDocumentRequest {
  source: DocumentSource;
}

export interface MeetingExtractionResult {
  content: string;
  lines: string[];
  paragraphs: string[];
  sentences: string[];
  actionItems: string[];
  decisions: string[];
  dates: string[];
  participants: string[];
}