import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: {
                message: "Validation failed.",
                details: error.flatten().fieldErrors,
            },
        });
    }
    res.status(500).json({
        success: false,
        error: {
            message: error.message,
        },
    });
};