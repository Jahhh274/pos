import type {DataSource, Repository} from "typeorm";
import {User, UserRepository} from "../models/user.ts";

export class UserService {
    private userRepository: UserRepository

    constructor(datasource: DataSource) {
        this.userRepository = new UserRepository(datasource)
    }

    async upsertUser(user: User) {
        await this.userRepository.upsertUser(user)
    }

    async getUsers(): Promise<User[]> {
        // get users from repository/models
        const users = await this.userRepository.getUsers()
        return users
    }
}