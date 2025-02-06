import express from "express";
import cors from "cors";
import helmet from "helmet";
import {mainRoute}  from "./routes/mainRoute.js";
import { Db_Connection } from './config/Db_Connection.js';
import dotenv from 'dotenv';
import { corsOptions } from "./config/corsConfig.js";
dotenv.config();



const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// Connect to Database
Db_Connection()

// Routes
app.use('/api/users', mainRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
