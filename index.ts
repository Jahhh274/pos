import express from "express"
import {MySQLDataSource} from "./src/models/datasource.ts";
import {HTTP_PORT} from "./src/config/config.ts";
import {UserController} from "./src/controllers/userController.ts";
import {createUsersRouter} from "./src/router/user.ts";

const application = express();

const datasource = await MySQLDataSource.initialize()
const userController = new UserController(datasource)
application.use(express.json())
application.use("/", createUsersRouter(userController))

application.listen(HTTP_PORT, () => {
    console.log(`Pos serving at port ${HTTP_PORT}`)
})