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
}