import express from "express"
// import {createAuthRouter} from "./src/router/authentication.ts";
import {MySQLDataSource} from "./src/models/datasource.ts";
import {HTTP_PORT} from "./src/config/config.ts";
// import {AuthController} from "./src/controllers/authController.ts";
import {SupplierController} from "./src/controllers/supplierController.ts";
import {UserController} from "./src/controllers/userController.ts";
import {createSuppliersRouter} from "./src/router/suppliers.ts";
import {createUsersRouter} from "./src/router/user.ts";

const application = express();

const datasource = await MySQLDataSource.initialize()
// const authController = new AuthController(datasource)
const supplierController = new SupplierController(datasource)
const userController = new UserController(datasource)
application.use(express.json())
// application.use("/", createAuthRouter(authController))
application.use("/", createSuppliersRouter(supplierController))
application.use("/", createUsersRouter(userController))

application.listen(HTTP_PORT, () => {
    console.log(`Pos serving at port ${HTTP_PORT}`)
})