import {HASH_KEY} from "../config/config.ts";
import {createHmac} from "crypto";

export function hashSHA256(data: string): string {
    const hmac = createHmac("sha256", HASH_KEY)
    hmac.update(data)
    return hmac.digest("hex")
}