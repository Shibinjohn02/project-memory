import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { documentRoutes } from "./modules/documents";
import { errorHandler } from "./common/errors/error-handler"

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Project Memory API is running."
    });
});

app.use("/documents", documentRoutes);

// ALWAYS LAST
app.use(errorHandler);

export default app;