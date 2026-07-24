import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

import { sequelize } from "../../common/database/sequelize";

export class Document extends Model<InferAttributes<Document>, InferCreationAttributes<Document>> {
    declare id: CreationOptional<number>;
    declare source: string;
    declare originalFilename: string;
    declare content: string;
    declare decisions: CreationOptional<string[]>;
    declare actionItems: CreationOptional<string[]>;
}

Document.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        originalFilename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        decisions: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
        actionItems: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize,
        tableName: "documents",
        timestamps: true,
    }
);