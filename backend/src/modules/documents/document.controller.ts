import { Request, Response } from "express";
import { documentService } from "./document.service";
import { successResponse } from "../../common/responses/success";

export const documentController = {
    health(_req: Request, res: Response) {
        const response = documentService.getHealthStatus();

        res.status(200).json(successResponse(response));
    },

    upload(req: Request, res: Response) {
        const file = req.file;

        if (!file) {
            throw new Error("No file uploaded.");
        }

        const response = documentService.upload(file, req.body.source);

        res.status(201).json(successResponse(response));
    }
};