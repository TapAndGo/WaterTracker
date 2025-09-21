import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from './Utils/db.js';
// import { router } from "./routes/routes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!")
})



import eventRouter from "./Routes/User.Route.js";
app.use("/user", eventRouter);

app.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
     console.error("❌ Database error:", err);
  }
});