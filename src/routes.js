import { Router } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import CustomerController from "./app/controllers/CustomerController";
import CustomerFavoriteProductController from "./app/controllers/CustomerFavoriteProductsController";

import errorMiddleware from "./app/middlewares/error";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Authenticate
routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);

// Customers
routes.get("/customer", CustomerController.index);
routes.get("/customer/:id", CustomerController.find);
routes.post("/customer", CustomerController.store);
routes.delete("/customer/:id", CustomerController.delete);

// Favorite Products
routes.post(
  "/customer/:customerId/product/:productId",
  CustomerFavoriteProductController.store,
);

routes.delete(
  "/customer/:customerId/product/:productId",
  CustomerFavoriteProductController.delete,
);

routes.use(errorMiddleware);

export default routes;
