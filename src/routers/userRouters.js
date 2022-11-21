import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
import signInValidate from "../middlewares/signInValidateMiddleware.js";
import signUpValidate from "../middlewares/signUpValidateMiddleware.js";

const router = Router();

router.post("/sign-up", signUpValidate, signUp);

router.post("/sign-in", signInValidate, signIn);

export default router;
