import { DocumentSource } from "../../modules/documents/document.types";
import { meetingExtractor } from "./meeting.extractor";
import { Extractor } from "./extractor.interface";

export const extractorFactory = {
    get(source: DocumentSource): Extractor {
        switch (source) {
            case "meeting":
                return meetingExtractor;

            default:
                throw new Error(`Unsupported document source: ${source}`);
        }
    },
};