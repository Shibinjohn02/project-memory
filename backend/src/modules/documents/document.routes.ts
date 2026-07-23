import { Router } from "express";
import { documentController } from "./document.controller";
import { upload } from "../../config/multer";
import { validate } from "../../common/validation/validate";
import { uploadDocumentSchema } from "./schemas/upload.schema";

const router = Router();

router.get("/health", documentController.health);
router.post("/upload", upload.single("file"), validate(uploadDocumentSchema), documentController.upload);

export default router;