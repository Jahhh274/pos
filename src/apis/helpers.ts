import type {RegisterRequest, UpsertSupplierRequest, UpsertCategoriesRequest} from "../interfaces/interfaces.ts";
import {Supplier, User, Categories} from "../repository/entities.ts";
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

export function enrichCategoriesRecord(data: UpsertCategoriesRequest): Categories {
    const categories = new Categories();
    if (data.id) {
        categories.id = data.id
    }
    categories.name = data.name
    categories.description = data.description
    return categories;
}