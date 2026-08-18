import "./models";
import { sequelize } from "./sequelize";

export async function initializeDatabase() {
    await sequelize.authenticate();
    console.log("Database connected.");
}