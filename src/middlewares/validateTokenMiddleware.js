import { sessionsCollection } from "../database/db.js";

export default async function validationToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const user = await sessionsCollection.findOne({ token });
    if (!user) return res.sendStatus(401);

    res.locals.user = user;
  } catch (err) {
    res.sendStatus(500);
  }

  next();
}
