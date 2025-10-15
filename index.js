import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from './Utils/db.js';
import './Models/index.js'
// import { router } from "./routes/routes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!")
})


import hydration_goalsRoute from "./Routes/hydration_goals.Route.js";
import userRoute from "./Routes/user.Route.js";
import custom_cupRoute from "./Routes/custom_cups.Route.js";

app.use("/hydration_goals", hydration_goalsRoute);
app.use("/user", userRoute);
app.use("/custom_cups", custom_cupRoute);


app.listen(process.env.PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    // Sync all models
    await sequelize.sync({ force: true });
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
     console.error("❌ Database error:", error);
  }
});