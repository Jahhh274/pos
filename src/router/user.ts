import {Router} from "express";
import {UserController} from "../controllers/userController.ts";

export function createUsersRouter(controller: UserController): Router {
    const router = Router()
    router.post("/users", (req, res) => controller.getUsers(req, res))
    return router
}