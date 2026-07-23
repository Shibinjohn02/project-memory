import { z } from "zod";

export const uploadDocumentSchema = z.object({
    source: z.enum([
        "meeting",
        "jira",
        "pull-request",
        "commit",
    ]),
});