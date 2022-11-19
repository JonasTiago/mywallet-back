import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routers/userRouters.js";
import recordsRouter from "./routers/recordsRouters.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recordsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port:${port}`));
