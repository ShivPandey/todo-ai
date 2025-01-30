import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./utils/database";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app: Application = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// database connection
connectDB();

// routers
app.use('/api/tasks', taskRoutes)
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
