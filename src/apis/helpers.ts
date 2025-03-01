import type { RegisterRequest } from "../interfaces/interfaces.ts";
import {User} from "../repository/entities.ts";
import {hashSHA256} from "../utils/hashing.ts";

export function enrichUserRecords(data: RegisterRequest): User {
    const user = new User();
    user.username = data.username
    user.email = data.email
    user.password = hashSHA256(data.password)
    user.fullName = data.fullName
    user.address = data.address
    return user;
}