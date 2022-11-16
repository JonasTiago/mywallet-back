import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

const app = express();

const userSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB Conectado!");
} catch (err) {
  console.log(err);
}

// criar/conectar com um db
const db = mongoClient.db("myWallet");
//criar/conectar com um  collection
const userCollection = db.collection("users");
const recordsCollection = db.collection("records");
const sessionsCollection = db.collection("sessions");

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password,
  };

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    await userCollection.insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userCollection.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidV4();

      await sessionsCollection.insertOne({
        token,
        userId: user._id,
      });

      return res.status(200).send({ token });
    } else {
      return res.status(401).send("erro de login");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(5000, () => console.log("app running port:5000"));
