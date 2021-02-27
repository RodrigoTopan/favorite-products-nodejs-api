/* eslint-disable no-undef */
import request from "supertest";
import app from "../../src/app";

import UserModel from "../../src/app/models/User";
import CustomerModel from "../../src/app/models/Customer";

describe("Session/Login", () => {
    beforeEach(async () => {
        await Promise.all([
            UserModel.deleteMany({}),
            CustomerModel.deleteMany({}),
        ]);
    });
    it("should be able create a session if given credentials are correct", async () => {
        await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        const response = await request(app).post("/session").send({
            username: "username",
            password: "password",
        });

        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.username).toBe("username");
        expect(response.body).toHaveProperty("token");
    });
    it("should not be able create a session if given credentials are wrong", async () => {
        await request(app).post("/user").send({
            username: "username",
            password: "password",
        });

        const response = await request(app).post("/session").send({
            username: "username",
            password: "pass",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Access denied");
    });
    it("should not be able create a session if there are no user registered", async () => {
        const response = await request(app).post("/session").send({
            username: "user",
            password: "pass",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Access denied");
    });
});
