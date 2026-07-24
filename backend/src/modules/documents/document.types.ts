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
  decisions: string[];
  actionItems: string[];
  dates: string[];
  participants: string[];
}