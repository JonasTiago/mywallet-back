import express from "express";
import cors from "cors";
import joi from "joi";

import { signUp, signIn } from "./controllers/userController.js";
import { records, StatusRecords } from "./controllers/recordsController.js";
import { db } from "./database/db.js";

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

export const userCollection = db.collection("users");
export const recordsCollection = db.collection("records");
export const sessionsCollection = db.collection("sessions");

//corrigir criação de user iguais
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/records/:status", StatusRecords);

app.get("/records", records);

app.listen(5000, () => console.log("app running port:5000"));
