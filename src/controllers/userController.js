import bcrypt from "bcrypt";
import { userCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
  const userExit = res.locals.user;

  if (userExit) {
    return res.status(409).send({ message: "Esse email já existe" });
  }

  const user = req.user;

  try {
    const passwordHash = bcrypt.hashSync(user.password, 10);

    await userCollection.insertOne({ ...user, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { password } = req.body;
  const user = res.locals.user;

  try {
    if (bcrypt.compareSync(password, user.password)) {
      const token = uuidV4();

      const onpeSession = await sessionsCollection.findOne({
        userId: user._id,
      });

      if (onpeSession) {
        await sessionsCollection.deleteOne({ _id: onpeSession._id });
      }

      await sessionsCollection.insertOne({
        token,
        userId: user._id,
      });

      return res.status(200).send({ token, user: user.name });
    } else {
      return res.status(401).send("Usuario/senha erradas!");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
