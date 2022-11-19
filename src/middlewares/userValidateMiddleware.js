import { userCollection } from "../database/db.js";

export default async function userValidate(req, res, next) {
  const { email } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    res.locals.user = user;
  } catch (err) {
    res.sendStatus(500);
  }

  next();
}
