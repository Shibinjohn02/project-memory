import { documentRepository } from "./document.repository";
import { textReader } from "../../common/files/text-reader";
import { textParser } from "../../common/parsers/text.parser";
import { extractorFactory } from "../../common/extractors/extractor.factory";
import { DocumentSource, Decision, ActionItem } from "./document.types";
import { Document } from "./document.model";
import { memoryRepository } from "../memory/memory.repository";

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

        await memoryRepository.bulkCreate([
            ...extracted.decisions.map((decision) => ({
                documentId: document.id,
                type: "decision" as const,
                content: decision.decision,
                metadata: {
                    reason: decision.reason,
                    owner: decision.owner,
                    createdAt: decision.createdAt,
                    confidence: decision.confidence,
                },
            })),

            ...extracted.actionItems.map((actionItem) => ({
                documentId: document.id,
                type: "action-item" as const,
                content: actionItem.task,
                metadata: {
                    owner: actionItem.owner,
                    status: actionItem.status,
                },
            })),
        ]);

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
        decisions: Decision[],
        actionItems: ActionItem[]
    ) {
        return await Document.create({
            source,
            originalFilename,
            content,
            decisions,
            actionItems,
        });
    },

    async deleteById(id: number) {
        const deleted = await documentRepository.deleteById(id);

        if (!deleted) {
            throw new Error("Document not found.");
        }

        return {
            message: "Document deleted successfully.",
        };
    },

    async getBySource(source: DocumentSource) {
        return await documentRepository.findBySource(source);
    },

};
