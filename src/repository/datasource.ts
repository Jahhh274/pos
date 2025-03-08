import { DataSource } from "typeorm";

import { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT } from "../config/config.ts"
import {Supplier, User, Categories} from "./entities.ts";

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
        User,
        Supplier,
        Categories
    ],
})
