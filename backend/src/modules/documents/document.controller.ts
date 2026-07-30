import { Request, Response } from "express";
import { documentService } from "./document.service";
import { successResponse } from "../../common/responses/success";
import { DocumentSource } from "./document.types";
import { memoryService } from "../memory/memory.service";
import { llmService } from "./llm/llm.service";


export const documentController = {
    health(_req: Request, res: Response) {
        const response = documentService.getHealthStatus();

        res.status(200).json(successResponse(response));
    },

    async upload(req: Request, res: Response) {
        const file = req.file;

        if (!file) {
            throw new Error("No file uploaded.");
        }

        const response = await documentService.upload(file, req.body.source);

        res.status(201).json(successResponse(response));
    },

    async getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const document = await documentService.getById(id);

        res.status(200).json(successResponse(document));
    },

    async getAll(req: Request, res: Response) {
        const documents = await documentService.getAll();

        res.status(200).json(successResponse(documents));
    },

    async deleteById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const response = await documentService.deleteById(id);

        res.status(200).json(successResponse(response));
    },

    async getBySource(req: Request, res: Response) {
        const { source } = req.query as { source: DocumentSource };
        console.log('source=', source)

        const documents = await documentService.getBySource(source);

        res.status(200).json(successResponse(documents));
    },

    async getMemoryById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const memory = await memoryService.getMemoryById(id);

        res.status(200).json(successResponse(memory));
    },

    async getActionItemsById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const actionItems = await memoryService.getActionItemsById(id);

        res.status(200).json(successResponse(actionItems));
    },

    async getTimelineById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const timeline = await memoryService.getTimelineById(id);

        res.status(200).json(successResponse(timeline));
    },

    async testLLM(_: Request, res: Response) {
        const response = await llmService.extractMeetingMemory(`
            Project Memory - Sprint Planning Meeting

            Decision:
            The team decided to use PostgreSQL JSONB because the structure may evolve over time.

            Action Item:
            John will update the deployment documentation before Friday.
        `);

        res.json({
            success: true,
            data: response,
        });
    }
};