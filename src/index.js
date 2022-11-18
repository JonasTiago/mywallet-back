import express from "express";
import cors from "cors";
import joi from "joi";

import userRouter from "./routers/userRouters.js";
import recordsRouter from "./routers/recordsRouters.js";

const app = express();

export const userSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

export const recordSchema = joi.object({
  descrição: joi.string().min(3).required(),
  valor: joi.number().required(),
  status: joi.string().valid("entrada", "saida").required(),
});

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recordsRouter);

app.listen(5000, () => console.log("app running port:5000"));
