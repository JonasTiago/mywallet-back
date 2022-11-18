import dayjs from "dayjs";
import {
  recordSchema,
  sessionsCollection,
  recordsCollection,
} from "../index.js";

export async function StatusRecords(req, res) {
  const { descrição, valor } = req.body; //validar esses dados
  const { status } = req.params;

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  const record = {
    descrição,
    valor,
    status,
  };

  const { error } = recordSchema.validate(record, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const userOk = await sessionsCollection.findOne({ token });

    if (!userOk) return res.sendStatus(400);

    await recordsCollection.insertOne({
      ...record,
      user_id: userOk.userId,
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function records(req, res) {
  // const limit = parseInt(req.query.limit);
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const userOk = await sessionsCollection.findOne({ token });

    if (!userOk) return res.sendStatus(400);

    const records = await recordsCollection
      .find({ user_id: userOk.userId })
      .toArray();

    res.status(200).send(records);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
