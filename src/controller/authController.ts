import { DataSource, Repository} from "typeorm";
import {User} from "../models/user.ts";
import type {Request, Response} from "express";
import type {RegisterRequest, RegisterResponse} from "../interfaces/interfaces.ts";
import {isValidEmail, isValidPassword} from "../utils/verification.ts";
import {StatusCodes} from "http-status-codes";
import {enrichUserRecord} from "./helpers.ts";
import {generateJWTPayload} from "../utils/jwt.ts";

export class AuthController {
    private usersRepository: Repository<User>

    constructor(datasource: DataSource) {
        this.usersRepository = datasource.getRepository(User)
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
            await this.usersRepository.save(user)
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
}