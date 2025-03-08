import {Router} from "express";
import {Handler} from "../apis/handler.ts";

export function createCategoriesRouter(handler: Handler): Router {
    const router = Router()
    router.post("", (req, res) => handler.upsertCategories(req, res))
    //router.post("/get", (req, res) => handler.getSuppliers(req, res))
    //router.delete("/:supplierId", (req, res) => handler.deleteSupplier(req, res))
    return router
}