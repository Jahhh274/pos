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
    phoneNumber: string,
    email: string,
    address: string,
}