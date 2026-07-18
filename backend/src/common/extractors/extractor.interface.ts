export interface Extractor {
  extract(content: string): unknown;
}