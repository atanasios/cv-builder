import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import cvRoutes from "./routes/cv.route";
import { connectDatabase } from "./database/database.config";
import trimBody from "./middlewares/trimBody";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//config
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(trimBody());

app.use("/api/auth", authRoutes);
app.use("/api/cv", cvRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is listening on port: ${PORT}`);
});
