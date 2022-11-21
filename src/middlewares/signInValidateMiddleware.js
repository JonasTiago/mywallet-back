import { userCollection } from "../database/db.js";

export default async function signInValidate(req, res, next) {
  const { email } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (!user) return res.sendStatus(401)

    res.locals.user = user;
  } catch (err) {
    res.sendStatus(500);
  }

  next();
}
