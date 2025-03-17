import type {Request, Response} from "express"
import type {
    DeleteSupplierParams, DeleteSupplierResponse,
    GetSuppliersRequest,
    GetSuppliersResponse,
    UpsertSupplierRequest, UpsertSupplierResponse
} from "../interfaces/interfaces.ts";
import {StatusCodes} from "http-status-codes";
import {enrichSupplierRecord} from "./helpers.ts";

import type {DataSource} from "typeorm";
import {SupplierService} from "../services/supplierService.ts";

export class SupplierController {
    private supplierService: SupplierService

    constructor(datasource: DataSource) {
        this.supplierService = new SupplierService(datasource)
    }

    async upsertSupplier(request: Request, response: Response) {
        try {
            const requestData = request.body as UpsertSupplierRequest

            if (!requestData.email && !requestData.phoneNumber) {
                response.status(StatusCodes.BAD_REQUEST).json({
                    message: "required at least phoneNumber or email"
                })
                return
            }

            const supplier = enrichSupplierRecord(requestData)
            await this.supplierService.upsertSupplier(supplier)
            const upsertResponse: UpsertSupplierResponse = {
                code: StatusCodes.OK.valueOf(),
                message: "Success",
                data: {
                    id: supplier.id,
                }
            }
            response.status(StatusCodes.OK).json(upsertResponse)
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `error: ${error}`})
        }
    }

    async getSuppliers(request: Request, response: Response) {
        try {
            const requestData = request.body as GetSuppliersRequest

            const suppliers = await this.supplierService.getSuppliers(requestData)

            const getSuppliersResponse: GetSuppliersResponse = {
                code: StatusCodes.OK.valueOf(),
                message: "Success",
                data: {
                    suppliers: suppliers,
                    page: requestData.page,
                    pageSize: requestData.pageSize,
                }
            }

            response.status(StatusCodes.OK).json(getSuppliersResponse)
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `error: ${error}`})
        }
    }

    async deleteSupplier(request: Request<DeleteSupplierParams>, response: Response) {
        try {
            const supplierId = parseInt(request.params.supplierId)
            await this.supplierService.softDeleteSupplierById(supplierId)
            const deleteResponse: DeleteSupplierResponse = {
                code: StatusCodes.OK.valueOf(),
                message: "Success",
            }
            response.status(StatusCodes.OK).json(deleteResponse)
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `error: ${error}`})
        }
    }

}