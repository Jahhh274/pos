import {Column, UpdateDateColumn} from "typeorm";

export interface JWTMetadata {
    id: number,
    role: string,
}

export interface RegisterRequest {
    username: string,
    password: string,
    email: string,
    fullName?: string,
    address?: string,
    phoneNumber?: string,
}

export interface RegisterResponse {
    token: string,
}

export interface UpsertSupplierRequest {
    id?: number,
    name: string,
    phoneNumber?: string,
    email?: string,
    address?: string,
}

export interface UpsertSupplierResponse {
    code: number,
    message: string,
    data: {
        id: number,
    }
}

export interface GetSuppliersRequest {
    ids: number[],
    name?: string,
    page: number,
    pageSize: number,
}

export interface GetSuppliersResponse {
    code: number,
    message: string,
    data: {
        suppliers: Supplier[],
        page: number,
        pageSize: number,
    },
}

export interface Supplier {
    id: number,
    name: string,
    phoneNumber?: string,
    email?: string,
    address?: string,
}

export interface DeleteSupplierParams {
    supplierId: string,
}

export interface DeleteSupplierResponse {
    code: number,
    message: string,
}

export interface GetUsersRequest {

}

export interface GetUsersResponse {
    users: User[],
}

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    fullName?: string;
    address?: string;
    phoneNumber?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}