import { z } from "zod";

export const documentSourceSchema = z.enum([
    "meeting",
    "jira",
    "pull-request",
    "commit",
]);

export const uploadDocumentSchema = z.object({
    body: z.object({
        source: documentSourceSchema,
    }),
});

export const searchDocumentSchema = z.object({
    query: z.object({
        source: documentSourceSchema,
    }),
});