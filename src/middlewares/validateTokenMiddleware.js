export default function validationToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
    console.log(token)
  if (!token) return res.sendStatus(401);

  req.token = token;

  next();
}
