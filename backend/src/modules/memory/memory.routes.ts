import { Router } from "express";
import { memoryController } from "./memory.controller";

const router = Router();

/**
 * Postman Name: Search Memory
 */
router.get("/search", memoryController.search);
router.get("/answer", memoryController.answer);
router.get("/search/semantic", memoryController.semanticSearch);
router.post("/ask", memoryController.ask);

export default router;