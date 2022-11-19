import dayjs from "dayjs";
import { recordsCollection } from "../database/db.js";

export async function StatusRecords(req, res) {
  const user = res.locals.user;
  const record = res.locals.record;

  try {
    await recordsCollection.insertOne({
      ...record,
      user_id: user.userId,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function records(req, res) {
  const user = res.locals.user;

  try {
    const records = await recordsCollection
      .find({ user_id: user.userId })
      .toArray();

    res.status(200).send(records);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
