import { documentRepository } from "./document.repository";
import { textReader } from "../../common/files/text-reader";
import { textParser } from "../../common/parsers/text.parser";
import { extractorFactory } from "../../common/extractors/extractor.factory";
import { DocumentSource } from "./document.types";
import { Document } from "./document.model";

export const documentService = {
    getHealthStatus() {
        const isConnected = documentRepository.checkConnection();

        return {
            module: "documents",
            status: isConnected ? "healthy" : "unhealthy",
        };
    },

    async upload(file: Express.Multer.File, source: DocumentSource) {
        const content = textReader.read(file.buffer);

        const parsed = textParser.parse(content);

        const extractor = extractorFactory.get(source);

        const extracted = extractor.extract(parsed.normalizedText);

        const document = await this.saveDocument(
            source,
            file.originalname,
            parsed.normalizedText,
            extracted.decisions,
            extracted.actionItems
        );

        return {
            documentId: document.id,
            filename: file.originalname,
            extracted,
        };
    },

    async getById(id: number) {
        const document = await documentRepository.findById(id);

        if (!document) {
            throw new Error("Document not found.");
        }

        return {
            id: document.id,
            source: document.source,
            originalFilename: document.originalFilename,
            decisions: document.decisions,
            actionItems: document.actionItems,
        };
    },

    async getAll() {
        return await documentRepository.findAll();
    },
    
    async saveDocument(
        source: string,
        originalFilename: string,
        content: string,
        decisions: string[],
        actionItems: string[]
    ) {
        return await Document.create({
            source,
            originalFilename,
            content,
            decisions,
            actionItems,
        });
    }

};
