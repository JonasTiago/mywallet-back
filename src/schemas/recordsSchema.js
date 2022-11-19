import joi from "joi";

const recordSchema = joi.object({
  descrição: joi.string().min(3).required(),
  valor: joi.number().required(),
  status: joi.string().valid("entrada", "saida").required(),
});

export default recordSchema;
