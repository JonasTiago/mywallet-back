import { userSchema } from "../index.js";
import bcrypt from "bcrypt";
import { userCollection, sessionsCollection } from "../index.js";
import { v4 as uuidV4 } from "uuid";


export async function signUp(req, res) {
    const { name, email, password } = req.body;
  
    try {
      const userExists = await userCollection.findOne({ email: email });
  
      if (userExists) {
        return res.status(409).send({ message: "Esse email já existe" });
      }
  
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
  
      await userCollection.insertOne({ ...user, password: passwordHash });
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
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

      return res.status(200).send({ token, user:user.name });
    } else {
      return res.status(401).send("Usuario/senha erradas!");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

   