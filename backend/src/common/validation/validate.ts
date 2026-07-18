import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: ZodType) =>
        (req: Request, _: Response, next: NextFunction) => {
            schema.parse(req.body);

            next();
        };