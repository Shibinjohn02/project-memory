import { Document } from "./document.model";
import { DocumentSource } from "./document.types";
import { Op } from "sequelize";

export const documentRepository = {
  checkConnection() {
    return true;
  },

  async findById(id: number) {
    return await Document.findByPk(id);
  },

  async findAll() {
    return await Document.findAll({
      attributes: [
        "id",
        "source",
        "originalFilename",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  async deleteById(id: number) {
    return await Document.destroy({
      where: { id },
    });
  },

  async findBySource(source: DocumentSource) {
    return await Document.findAll({
      where: { source },
      attributes: [
        "id",
        "source",
        "originalFilename",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  async findMemoryById(id: number) {
    return await Document.findByPk(id, {
      attributes: [
        "id",
        "source",
        "originalFilename",
        "decisions",
        "actionItems",
        "createdAt",
      ],
    });
  },

  async findActionItemsById(id: number) {
    return await Document.findByPk(id, {
      attributes: [
        "id",
        "actionItems",
      ],
    });
  },

  async findTimelineById(id: number) {
    return await Document.findByPk(id, {
      attributes: [
        "id",
        "decisions",
        "actionItems"
      ],
    });
  },

  async search(keywords: string[]) {
    return await Document.findAll({
      where: {
        [Op.or]: keywords.map((keyword) => ({
          content: {
            [Op.iLike]: `%${keyword}%`,
          },
        })),
      },
      order: [["createdAt", "DESC"]],
    });
  }
};