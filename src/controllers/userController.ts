import {UserService} from "../services/userService.ts";
import type {Request, Response} from "express";
import type {GetUsersResponse} from "../interfaces/interfaces.ts";
import {StatusCodes} from "http-status-codes";
import type {DataSource} from "typeorm";

export class UserController {
    private userService: UserService

    constructor(datasource: DataSource) {
        this.userService = new UserService(datasource)
    }

    async getUsers(request: Request, response: Response) {
        // get users from userService
        const users = await this.userService.getUsers()
        const getUsersResponse: GetUsersResponse = {
            users: users
        }
        response.status(StatusCodes.OK).json(getUsersResponse)
    }
}