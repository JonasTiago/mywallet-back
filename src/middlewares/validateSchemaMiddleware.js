import recordSchema from "../schemas/recordsSchema.js";

export default function validateSchema(req, res, next) {
  const { descrição, valor } = req.body;
  const { status } = req.params;

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

  res.locals.record = record;

  next();
}
