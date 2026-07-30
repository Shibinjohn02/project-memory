import { Router } from "express";
import { documentController } from "./document.controller";
import { upload } from "../../config/multer";
import { validate } from "../../common/validation/validate";
import { uploadDocumentSchema, searchDocumentSchema } from "./schemas/upload.schema";

const router = Router();

router.get("/health", documentController.health);

router.post(
    "/upload",
    upload.single("file"),
    validate(uploadDocumentSchema),
    documentController.upload
);

router.get("/", documentController.getAll);
router.get(
    "/search",
    validate(searchDocumentSchema),
    documentController.getBySource
);

router.get("/", documentController.getAll);
router.get("/search", validate(searchDocumentSchema), documentController.getBySource);

router.get("/:id/memory", documentController.getMemoryById);
router.get("/:id/action-items", documentController.getActionItemsById);
router.get("/:id/timeline", documentController.getTimelineById);
router.get("/test-llm", documentController.testLLM);
router.get("/:id", documentController.getById);

router.delete("/:id", documentController.deleteById);

export default router;