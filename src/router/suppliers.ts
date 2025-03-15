import {Router} from "express";
import {SupplierController} from "../controller/supplierController.ts";

export function createSuppliersRouter(controller: SupplierController): Router {
    const router = Router()
    router.post("", (req, res) => controller.upsertSupplier(req, res))
    router.post("/get", (req, res) => controller.getSuppliers(req, res))
    router.delete("/:supplierId", (req, res) => controller.deleteSupplier(req, res))
    return router
}