import { Router } from "express";

// Controllers
import userController from "@controllers/UserController";
import sessionController from "@controllers/SessionController";
import customerController from "@controllers/CustomerController";
import customerFavoriteProductController from "@controllers/CustomerFavoriteProductsController";

// API BASIC MIDDLEWARES
import authMiddleware from "@middlewares/auth";
import errorMiddleware from "@middlewares/error";

// HTTP VALIDATORS
import userValidator from "@validators/UserValidator";
import sessionValidator from "@validators/SessionValidator";
import customerValidator from "@validators/CustomerValidator";
import CustomerFavoriteProductValidator from "@validators/CustomerFavoriteProductValidator";

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
