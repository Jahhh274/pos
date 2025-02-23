import express from "express"
import authRouter from "./src/router/authentication.ts";
import {MySQLDataSource} from "./src/repository/datasource.ts";
import {HTTP_PORT} from "./src/config/config.ts";

const application = express();

await MySQLDataSource.initialize()
application.use(express.json())
application.use("/", authRouter)


application.listen(HTTP_PORT, () => {
    console.log(`Pos serving at port ${HTTP_PORT}`)
})