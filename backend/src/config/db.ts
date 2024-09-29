import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { setupModels } from "../models/relation";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection is established successfully");
  })
  .catch((error) => {
    console.log("Unable to connect to the database: " + error);
    process.exit(1);
  });

setupModels(sequelize);

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    // To skip running migrations and forcefully create tables
    // await sequelize.sync({ force: true });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();

export default sequelize;
