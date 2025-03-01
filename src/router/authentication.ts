import {Router} from "express";
import {Handler} from "../apis/handler.ts";

export function createAuthRouter(handler: Handler): Router {
    const router = Router()
    router.post("/register", (req, res) => handler.register(req, res))
    return router
}