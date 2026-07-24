import { Document } from "./document.model";

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
  }
};