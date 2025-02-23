import {Router} from "express";
import {register} from "../apis/authentication.ts";

const authRouter = Router();

authRouter.post("/register", register)

export default authRouter;