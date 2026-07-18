import { Router } from "express";
import { documentController } from "./document.controller";
import { upload } from "../../config/multer";

const router = Router();

router.get("/health", documentController.health);
router.post("/", upload.single("file"), documentController.upload);

export default router;