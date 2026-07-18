import { documentRepository } from "./document.repository";
import { textReader } from "../../common/files/text-reader";
import { textParser } from "../../common/parsers/text.parser";
import { extractorFactory } from "../../common/extractors/extractor.factory";
import { DocumentSource } from "./document.types";

export const documentService = {
    getHealthStatus() {
        const isConnected = documentRepository.checkConnection();

        return {
            module: "documents",
            status: isConnected ? "healthy" : "unhealthy",
        };
    },

    upload(file: Express.Multer.File, source: DocumentSource) {
        const content = textReader.read(file.buffer);

        const parsed = textParser.parse(content);

        const extractor = extractorFactory.get(source);

        const extracted = extractor.extract(parsed.normalizedText);

        return {
            filename: file.originalname,
            extracted,
        };
    }
};