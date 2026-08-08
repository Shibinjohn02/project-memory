import { InferCreationAttributes, Op } from "sequelize";
import { Memory } from "./memory.model";
import type { CreateMemory } from "./memory.types";

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
    }
};