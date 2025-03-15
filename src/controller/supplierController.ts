import type {Request, Response} from "express"
import type {
    DeleteSupplierParams, DeleteSupplierResponse,
    GetSuppliersRequest,
    GetSuppliersResponse,
    UpsertSupplierRequest, UpsertSupplierResponse
} from "../interfaces/interfaces.ts";
import {StatusCodes} from "http-status-codes";
import {enrichSupplierRecord} from "./helpers.ts";

import type {DataSource, Repository} from "typeorm";
import {Supplier} from "../models/supplier.ts";

export class SupplierController {
    private suppliersRepository: Repository<Supplier>

    constructor(datasource: DataSource) {
        this.suppliersRepository = datasource.getRepository(Supplier)
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
            await this.suppliersRepository.save(supplier)
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

            // create query builder
            let queryBuilder = this.suppliersRepository.createQueryBuilder()

            if (requestData.ids) {
                queryBuilder = queryBuilder.andWhereInIds(requestData.ids)
            }
            if (requestData.name) {
                queryBuilder = queryBuilder.andWhere("MATCH(name) AGAINST(:name IN BOOLEAN MODE)", {name: requestData.name})
            }
            if (requestData.page && requestData.pageSize) {
                const offset = (requestData.page - 1) * requestData.pageSize
                queryBuilder = queryBuilder.limit(requestData.pageSize).offset(offset)
            }

            const suppliers = await queryBuilder.getMany()

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
            await this.suppliersRepository.softDelete({"id": supplierId})
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