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