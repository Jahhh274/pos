import {Router} from "express";
import {AuthController} from "../controller/authController.ts";

export function createAuthRouter(controller: AuthController): Router {
    const router = Router()
    router.post("/register", (req, res) => controller.register(req, res))
    return router
}