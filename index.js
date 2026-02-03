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
  res.send("Hello waa")
})


import hydration_goalsRoute from "./Routes/hydration_goals.Route.js";
import userRoute from "./Routes/user.Route.js";
import intake_logRoute from "./Routes/intake_log.Route.js";
import user_day_summaryRoute from "./Routes/get_user_day_summary.Route.js";

app.use("/hydration_goals", hydration_goalsRoute);
app.use("/user", userRoute);
app.use("/intake_log", intake_logRoute);
app.use("/user_day_summary", user_day_summaryRoute);


app.listen(process.env.PORT , '0.0.0.0', async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected...");

    // Sync all models
    await sequelize.sync( { alter: true } );
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
     console.error("❌ Database error:", error);
  }
});
