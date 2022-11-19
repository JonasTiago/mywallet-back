import userSchema from "../schemas/userSchema.js";

export default function userSchemaValidate(req, res, next) {
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

  console.log(user)

  req.user = user;

  next();
}
