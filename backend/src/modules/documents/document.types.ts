export type DocumentSource =
  | "meeting"
  | "jira"
  | "pull-request"
  | "commit";

export interface UploadDocumentRequest {
  source: DocumentSource;
}