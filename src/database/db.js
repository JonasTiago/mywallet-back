import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB Conectado!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("myWallet");

export const userCollection = db.collection("users");
export const recordsCollection = db.collection("records");
export const sessionsCollection = db.collection("sessions");
