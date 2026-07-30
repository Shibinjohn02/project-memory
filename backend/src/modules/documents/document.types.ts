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
  decisions: Decision[];
  actionItems: ActionItem[];
  dates: string[];
  participants: string[];
}

export interface Decision {
    decision: string;
    reason?: string;
    owner?: string;
    createdAt?: string;
    confidence?: number;
}

export interface ActionItem {
    task: string;
    owner?: string;
    status: "pending" | "completed";
}