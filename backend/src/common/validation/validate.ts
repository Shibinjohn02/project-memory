import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validate =
    (schema: ZodType) =>
        (req: Request, _: Response, next: NextFunction) => {
            schema.parse(req.body);

            next();
        };