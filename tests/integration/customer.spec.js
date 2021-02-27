/* eslint-disable no-undef */

import request from "supertest";
import app from "../../src/app";

import UserModel from "../../src/app/models/User";
import CustomerModel from "../../src/app/models/Customer";

describe("Customer", () => {
    let token;
    beforeEach(async () => {
        await Promise.all([
            UserModel.deleteMany({}),
            CustomerModel.deleteMany({}),
        ]);

        await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        const response = await request(app).post("/session").send({
            username: "username",
            password: "password",
        });

        token = response.body.token;
    });

    describe("/POST - CREATE CUSTOMER", () => {
        it("should be able to create a customer when user API is authenticated", async () => {
            const response = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body.name).toStrictEqual("Rodrigo");
            expect(response.body.email).toStrictEqual("rodrigo@gmail.com");
        });

        it("should not be able to create a customer when its given a invalid token", async () => {
            const response = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}1`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            expect(response.status).toBe(401);
            expect(response.body.error).toStrictEqual("Invalid token");
        });

        it("should not be able to create a customer when its not given a token", async () => {
            const response = await request(app).post("/customer").send({
                name: "Rodrigo",
                email: "rodrigo@gmail.com",
            });

            expect(response.status).toBe(401);
            expect(response.body.error).toStrictEqual("Token not provided");
        });

        it("should not be able to register two customer with same email", async () => {
            await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            const response = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Roberta",
                    email: "rodrigo@gmail.com",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Customer email already exists");
        });
    });

    describe("/GET - FIND", () => {
        it("should be able to findAll customers paginated when user API is authenticated", async () => {
            await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            const response = await request(app)
                .get("/customer")
                .set("Authorization", `bearer ${token}`)
                .query({ page: 0 });

            expect(response.body[0].name).toBe("Rodrigo");
            expect(response.body[0].email).toBe("rodrigo@gmail.com");
            expect(response.body[0].favoriteProducts.length).toBe(0);
            expect(response.body[0]).toHaveProperty("createdAt");
            expect(response.body[0]).toHaveProperty("updatedAt");

            const cached = await request(app)
                .get("/customer")
                .set("Authorization", `bearer ${token}`)
                .query({ page: 0 });

            expect(cached.body[0].name).toBe("Rodrigo");
            expect(cached.body[0].email).toBe("rodrigo@gmail.com");
            expect(cached.body[0].favoriteProducts.length).toBe(0);
            expect(cached.body[0]).toHaveProperty("createdAt");
            expect(cached.body[0]).toHaveProperty("updatedAt");
        });

        it("should be able to find a customer by id when user API is authenticated", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            const response = await request(app)
                .get(`/customer/${customer.id}`)
                .set("Authorization", `bearer ${token}`)
                .send();

            expect(response.body.name).toBe("Rodrigo");
            expect(response.body.email).toBe("rodrigo@gmail.com");
            expect(response.body.favoriteProducts.length).toBe(0);
            expect(response.body).toHaveProperty("createdAt");
            expect(response.body).toHaveProperty("updatedAt");
        });
    });

    describe("/PUT UPDATE CUSTOMERS", () => {
        it("should be able to update registered customers when user API is authenticated", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            const response = await request(app)
                .put(`/customer/${customer.id}`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rafael",
                    email: "rafael@gmail.com",
                });

            expect(response.body.name).toBe("Rafael");
            expect(response.body.email).toBe("rafael@gmail.com");
        });

        it("should not be able to update a customers which doesn't exists ", async () => {
            const response = await request(app)
                .put(`/customer/60398e4c5e3767f51284778a`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rafael",
                    email: "rafael@gmail.com",
                });

            expect(response.status).toBe(404);
            expect(response.body.error).toBe("Customer does not exist");
        });

        it("should not be able to update registered customer email when email is already registered", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Roberta",
                    email: "roberta@gmail.com",
                });

            const response = await request(app)
                .put(`/customer/${customer.id}`)
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rafael",
                    email: "roberta@gmail.com",
                });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe("Customer email already in use");
        });
    });

    describe("/DELETE - DELETE CUSTOMERS", () => {
        it("should be able to delete a customer", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            const response = await request(app)
                .delete(`/customer/${customer.id}`)
                .set("Authorization", `bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(
                "Customer successfully removed "
            );
        });
    });
});
