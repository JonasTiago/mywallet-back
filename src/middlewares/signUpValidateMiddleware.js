import { userCollection } from "../database/db.js";
import userSchema from "../schemas/userSchema.js";

export default async function signUpValidate(req, res, next) {
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

  const userExists = await userCollection.findOne({ email: user.email });

  if (userExists) return res.sendStatus(409);

  res.user = user;

  next();
}
