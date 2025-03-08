import express from "express"
import {createAuthRouter} from "./src/router/authentication.ts";
import {MySQLDataSource} from "./src/repository/datasource.ts";
import {HTTP_PORT} from "./src/config/config.ts";
import {Handler} from "./src/apis/handler.ts";
import {Storage} from "./src/repository/storage.ts"
import {createSuppliersRouter} from "./src/router/suppliers.ts";
import {createCategoriesRouter} from "./src/router/categories.ts";

const application = express();

const datasource = await MySQLDataSource.initialize()
const handler = new Handler(new Storage(datasource))
application.use(express.json())
application.use("/", createAuthRouter(handler))
application.use("/suppliers", createSuppliersRouter(handler))
application.use("/categories", createCategoriesRouter(handler))


application.listen(HTTP_PORT, () => {
    console.log(`Pos serving at port ${HTTP_PORT}`)
})