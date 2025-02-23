declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MYSQL_USERNAME: string,
            MYSQL_PASSWORD: string,
            MYSQL_DATABASE: string,
            MYSQL_HOST: string,
            MYSQL_PORT: number,
            HTTP_PORT: number,
            HASH_KEY: string,
            ENCRYPT_KEY: string,
            JWT_EXPIRATION_IN_MS: number,
        }
    }
}

export { };
