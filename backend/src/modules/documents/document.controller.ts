import { Request, Response } from "express";
import { documentService } from "./document.service";
import { successResponse } from "../../common/responses/success";

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
    }
};