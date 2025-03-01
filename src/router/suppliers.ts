import {Router} from "express";
import {Handler} from "../apis/handler.ts";

export function createSuppliersRouter(handler: Handler): Router {
    const router = Router()
    router.post("/get", (req, res) => handler.getSuppliers(req, res))
    return router
}