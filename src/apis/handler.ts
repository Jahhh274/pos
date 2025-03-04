import type {Request, Response} from "express"
import type {
    DeleteSupplierParams, DeleteSupplierResponse,
    GetSuppliersRequest,
    GetSuppliersResponse,
    RegisterRequest,
    RegisterResponse, UpsertSupplierRequest, UpsertSupplierResponse
} from "../interfaces/interfaces.ts";
import {isValidEmail, isValidPassword} from "../utils/verification.ts";
import {StatusCodes} from "http-status-codes";
import {enrichSupplierRecord, enrichUserRecord} from "./helpers.ts";
import {generateJWTPayload} from "../utils/jwt.ts";
import {Storage} from "../repository/storage.ts"

export class Handler {
    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
    }

    async register(request: Request, response: Response) {
        try {
            const registerData = request.body as RegisterRequest

            // verify email
            if (!isValidEmail(registerData.email)) {
                response.status(StatusCodes.BAD_REQUEST).json({message: "email is invalid"})
                return
            }

            // verify password constraints
            if (!isValidPassword(registerData.password)) {
                response.status(StatusCodes.BAD_REQUEST).json({message: "password is invalid"})
                return
            }

            // verify username
            if (registerData.username.length == 0) {
                response.status(StatusCodes.BAD_REQUEST).json({message: "username is invalid"})
                return
            }

            // save information to database
            const user = enrichUserRecord(registerData)
            await this.storage.upsertUser(user)
            // create jwt
            const token = generateJWTPayload({
                id: user.id,
                role: user.role
            })
            const registerResponse: RegisterResponse = {
                token: token,
            }
            response.status(StatusCodes.OK).json(registerResponse)
            return
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `error: ${error}`})
            return
        }
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
            await this.storage.upsertSupplier(supplier)
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

            const suppliers = await this.storage.getSuppliers({
                ids: requestData.ids,
                name: requestData.name,
                page: requestData.page,
                pageSize: requestData.pageSize,
            })
            console.log(suppliers)
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
            await this.storage.softDeleteSupplier(supplierId)
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