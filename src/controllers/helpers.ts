import type {RegisterRequest, UpsertSupplierRequest} from "../interfaces/interfaces.ts";
import { Supplier } from "../models/supplier.ts";
import {User} from "../models/user.ts";
import {hashSHA256} from "../utils/hashing.ts";

export function enrichUserRecord(data: RegisterRequest): User {
    const user = new User();
    user.username = data.username
    user.email = data.email
    user.password = hashSHA256(data.password)
    user.fullName = data.fullName
    return user;
}

export function enrichSupplierRecord(data: UpsertSupplierRequest): Supplier {
    const supplier = new Supplier();
    if (data.id) {
        supplier.id = data.id
    }
    supplier.name = data.name
    supplier.email = data.email
    supplier.phoneNumber = data.phoneNumber
    supplier.address = data.address
    return supplier;
}