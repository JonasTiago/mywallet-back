import express from "express";
import cors from "cors";

import userRouter from "./routers/userRouters.js";
import recordsRouter from "./routers/recordsRouters.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recordsRouter);


app.listen(5000, () => console.log("app running port:5000"));
