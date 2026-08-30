import { InferCreationAttributes, Op } from "sequelize";
import { Memory } from "./memory.model";
import type { CreateMemory } from "./memory.types";
import { sequelize } from "../../common/database/sequelize";
import type { MemoryType } from "./memory.types";

export const memoryRepository = {
    async create(memory: InferCreationAttributes<Memory>) {
        return await Memory.create(memory);
    },

    async findById(id: number) {
        return await Memory.findByPk(id);
    },

    async findByDocumentId(documentId: number) {
        return await Memory.findAll({
            where: {
                documentId,
            },
            order: [["createdAt", "ASC"]],
        });
    },

    async bulkCreate(memories: CreateMemory[]) {
        return await Memory.bulkCreate(memories as any);
    },

    async updateEmbeddings(
        embeddings: { id: number; embedding: number[] }[]
    ) {
        if (embeddings.length === 0) {
            return;
        }

        const values = embeddings
            .map(
                (_, index) =>
                    `(:id${index}, :embedding${index}::vector)`
            )
            .join(", ");

        const replacements: Record<string, number | string> = {};

        embeddings.forEach((item, index) => {
            replacements[`id${index}`] = item.id;
            replacements[`embedding${index}`] =
                `[${item.embedding.join(",")}]`;
        });

        await sequelize.query(
            `
        UPDATE memories AS m
        SET embedding = v.embedding
        FROM (
            VALUES ${values}
        ) AS v(id, embedding)
        WHERE m.id = v.id
        `,
            {
                replacements,
            }
        );
    },

    async search(keywords: string[]) {
        return await Memory.findAll({
            where: {
                [Op.or]: keywords.map((keyword) => ({
                    content: {
                        [Op.iLike]: `%${keyword}%`,
                    },
                })),
            },
            order: [["created_at", "DESC"]],
        });
    },

    async semanticSearch(embedding: number[], limit: number = 5, maxDistance: number = 0.8, memoryType?: MemoryType, status?: string) {
        const vector = `[${embedding.join(",")}]`;
        const typeCondition = memoryType ? "AND type = :memoryType" : "";
        const statusCondition = status ? "AND metadata->>'status' = :status": "";

        const [memories] = await sequelize.query(
            `
                SELECT
                    -- id,
                    -- document_id,
                    -- type,
                    content,
                    -- metadata,
                    -- created_at,
                    -- updated_at,
                    embedding <=> CAST(:embedding AS vector) AS similarity_distance
                FROM memories
                WHERE embedding IS NOT NULL
                -- AND embedding <=> CAST(:embedding AS vector) <= :maxDistance
                    ${typeCondition}
                    ${statusCondition}
                ORDER BY embedding <=> CAST(:embedding AS vector)
                LIMIT :limit
            `,
            {
                replacements: {
                    embedding: vector,
                    limit,
                    // maxDistance,
                    memoryType,
                    status
                },
            }
        );

        return memories;
    },
};