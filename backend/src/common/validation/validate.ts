import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
    (schema: ZodType) =>
        (req: Request, _: Response, next: NextFunction) => {
            const result = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!result.success) {
                throw new Error(result.error.message);
            }

            next();
        };