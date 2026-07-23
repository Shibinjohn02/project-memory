import "./models";
import { sequelize } from "./sequelize";

export async function initializeDatabase() {
  await sequelize.authenticate();
  console.log("Database connected.");

  await sequelize.sync();
  console.log("Database synchronized.");

  // Future
  // await redis.connect();
  // await queue.initialize();
}