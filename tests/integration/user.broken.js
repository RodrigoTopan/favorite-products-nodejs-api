/* eslint-disable no-undef */
import request from "supertest";
import app from "../../src/app";

import UserModel from "../../src/app/models/User";
import CustomerModel from "../../src/app/models/Customer";

describe("User", () => {
    beforeEach(async () => {
        await Promise.all([
            UserModel.deleteMany({}),
            CustomerModel.deleteMany({}),
        ]);
    });
    it("should be able to create a user", async () => {
        const response = await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.username).toStrictEqual("username");
    });

    it("should not be able to register a user if username already exists in database", async () => {
        await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        const response = await request(app).post("/user").send({
            username: "username",
            password: "password",
        });
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ error: "User already exists" });
    });

    it("should not be able to register a user if password is not given", async () => {
        const response = await request(app).post("/user").send({
            username: "username",
        });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ error: "Validation fails" });
    });

    it("should not be able to register a user if password is empty", async () => {
        const response = await request(app).post("/user").send({
            username: "username",
            password: "",
        });

        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ error: "Validation fails" });
    });
});
