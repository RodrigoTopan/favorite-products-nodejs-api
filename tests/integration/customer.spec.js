/* eslint-disable no-undef */
// import mongoose from "mongoose"; // Memory server
import request from "supertest";
import app from "../../src/app";

import UserModel from "../../src/app/models/User";
import CustomerModel from "../../src/app/models/Customer";

describe("Customer", () => {
    let token;
    beforeEach(async () => {
        await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        const response = await request(app).post("/session").send({
            username: "username",
            password: "password",
        });

        token = response.body.token;

        // Clear mock db
        await Promise.all([
            CustomerModel.deleteMany({}),
            UserModel.deleteMany({}),
        ]);
    });
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
    });

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
        expect(response.body.error).toBe("Customer email already exists");
    });
});
