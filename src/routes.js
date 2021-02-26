import { Router } from "express";

// Controllers
import userController from "./app/controllers/UserController";
import sessionController from "./app/controllers/SessionController";
import customerController from "./app/controllers/CustomerController";
import customerFavoriteProductController from "./app/controllers/CustomerFavoriteProductsController";

// API BASIC MIDDLEWARES
import authMiddleware from "./app/middlewares/auth";
import errorMiddleware from "./app/middlewares/error";

// HTTP VALIDATORS
import userValidator from "./app/validators/UserValidator";
import sessionValidator from "./app/validators/SessionValidator";
import customerValidator from "./app/validators/CustomerValidator";
import CustomerFavoriteProductValidator from "./app/validators/CustomerFavoriteProductValidator";

const routes = new Router();

// Authenticate
routes.post("/user", userValidator.store, userController.store);
routes.post("/session", sessionValidator.store, sessionController.store);

routes.use(authMiddleware);

// Customers
routes.get("/customer", customerValidator.index, customerController.index);
routes.get("/customer/:id", customerController.find);
routes.post("/customer", customerValidator.store, customerController.store);

routes.put(
    "/customer/:id",
    customerValidator.update,
    customerController.update
);

routes.delete(
    "/customer/:id",
    customerValidator.delete,
    customerController.delete
);

// Favorite Products
routes.post(
    "/customer/:customerId/product/:productId",
    CustomerFavoriteProductValidator.store,
    customerFavoriteProductController.store
);

routes.delete(
    "/customer/:customerId/product/:productId",
    CustomerFavoriteProductValidator.delete,
    customerFavoriteProductController.delete
);

routes.use(errorMiddleware);

export default routes;
