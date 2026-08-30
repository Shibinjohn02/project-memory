import { Request, Response } from "express";
import { successResponse } from "../../common/responses/success";
import { memoryService } from "./memory.service";

export const memoryController = {
    async search(req: Request, res: Response) {
        const query = String(req.query.q || "");

        const memories = await memoryService.search(query);

        return res.status(200).json(successResponse(memories));
    },

    async semanticSearch(req: Request, res: Response) {
        const query = String(req.query.q || "");

        const memories = await memoryService.semanticSearch(query);

        return res.status(200).json(successResponse(memories));
    },

    async ask(req: Request, res: Response) {
        const { question } = req.body;

        const result = await memoryService.ask(question);

        return res.status(200).json(successResponse(result));
    },
};