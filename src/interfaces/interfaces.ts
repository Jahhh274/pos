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