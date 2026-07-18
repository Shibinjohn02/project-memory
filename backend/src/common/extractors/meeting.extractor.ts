import { Extractor } from "./extractor.interface";

export const meetingExtractor: Extractor = {
  extract(content: string) {
    return {
      content,
    };
  },
};