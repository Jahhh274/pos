import type {JWTMetadata} from "../interfaces/interfaces.ts";
import jwt from "jsonwebtoken"
import {ENCRYPT_KEY, JWT_EXPIRATION_IN_MS} from "../config/config.ts";

export function generateJWTPayload(metadata: JWTMetadata): string {
    return  jwt.sign(metadata, ENCRYPT_KEY, {expiresIn: JWT_EXPIRATION_IN_MS})
}