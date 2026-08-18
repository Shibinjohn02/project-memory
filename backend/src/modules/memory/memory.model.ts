import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

import { sequelize } from "../../common/database/sequelize";
import type { MemoryType } from "./memory.types";
export class Memory extends Model<
    InferAttributes<Memory>,
    InferCreationAttributes<Memory>
> {
    declare id: CreationOptional<number>;
    declare documentId: number;
    declare type: MemoryType;
    declare content: string;
    declare metadata: CreationOptional<Record<string, unknown>>;
}

Memory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        documentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        metadata: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
    },
    {
        sequelize,
        tableName: "memories",
        timestamps: true,
        underscored: true,
    }
);