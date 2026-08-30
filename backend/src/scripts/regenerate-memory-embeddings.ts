import "../common/database/models";

import { sequelize } from "../common/database/sequelize";
import { Memory } from "../modules/memory/memory.model";
import { embeddingService } from "../modules/memory/embedding/embedding.instance";
import { memoryRepository } from "../modules/memory/memory.repository";

async function regenerateMemoryEmbeddings() {
    await sequelize.authenticate();

    console.log("Database connected.");

    const memories = await Memory.findAll({
        attributes: ["id", "content"],
    });

    console.log(`Found ${memories.length} memories.`);

    if (memories.length === 0) {
        return;
    }

    const embeddings = await embeddingService.generateMany(
        memories.map((memory) => memory.content),
        "retrieval.passage"
    );

    await memoryRepository.updateEmbeddings(
        memories.map((memory, index) => ({
            id: memory.id,
            embedding: embeddings[index],
        }))
    );

    console.log("Memory embeddings regenerated successfully.");
}

regenerateMemoryEmbeddings()
    .catch((error) => {
        console.error("Failed to regenerate memory embeddings:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await sequelize.close();
    });