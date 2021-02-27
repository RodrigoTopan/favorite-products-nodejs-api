/* eslint-disable no-undef */
import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";

import UserModel from "../../src/app/models/User";
import CustomerModel from "../../src/app/models/Customer";

import customerFavoriteProductsService from "../../src/app/services/CustomerFavoriteProductsService";

describe("CustomerFavoriteProduct", () => {
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

    afterAll((done) => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close();
        done();
    });

    describe("/POST - ADD PRODUCT TO FAVORITE LIST", () => {
        it("should be able to add many favorite products to customer list when user API is authenticated", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            jest.spyOn(
                customerFavoriteProductsService,
                "findProduct"
            ).mockResolvedValue({
                price: 1999,
                image:
                    "http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg",
                brand: "bébé confort",
                id: "4bd442b1-4a7d-2475-be97-a7b22a08a024",
                title: "Cadeira para Auto Axiss Bébé Confort Robin Red",
            });

            const response = await request(app)
                .post(
                    `/customer/${customer.id}/product/4bd442b1-4a7d-2475-be97-a7b22a08a024`
                )
                .set("Authorization", `bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.name).toStrictEqual("Rodrigo");
            expect(response.body.email).toStrictEqual("rodrigo@gmail.com");
            expect(response.body.favoriteProducts).toStrictEqual([
                {
                    price: 1999,
                    image:
                        "http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg",
                    brand: "bébé confort",
                    id: "4bd442b1-4a7d-2475-be97-a7b22a08a024",
                    title: "Cadeira para Auto Axiss Bébé Confort Robin Red",
                },
            ]);
        });
    });

    describe("/DELETE - REMOVE PRODUCT TO FAVORITE LIST", () => {
        it("should be able to remove favorite products to customer list when user API is authenticated", async () => {
            const { body: customer } = await request(app)
                .post("/customer")
                .set("Authorization", `bearer ${token}`)
                .send({
                    name: "Rodrigo",
                    email: "rodrigo@gmail.com",
                });

            jest.spyOn(
                customerFavoriteProductsService,
                "findProduct"
            ).mockResolvedValue({
                price: 1999,
                image:
                    "http://challenge-api.luizalabs.com/images/4bd442b1-4a7d-2475-be97-a7b22a08a024.jpg",
                brand: "bébé confort",
                id: "4bd442b1-4a7d-2475-be97-a7b22a08a024",
                title: "Cadeira para Auto Axiss Bébé Confort Robin Red",
            });

            await request(app)
                .post(
                    `/customer/${customer.id}/product/4bd442b1-4a7d-2475-be97-a7b22a08a024`
                )
                .set("Authorization", `bearer ${token}`)
                .send();

            const response = await request(app)
                .delete(
                    `/customer/${customer.id}/product/4bd442b1-4a7d-2475-be97-a7b22a08a024`
                )
                .set("Authorization", `bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body.name).toStrictEqual("Rodrigo");
            expect(response.body.email).toStrictEqual("rodrigo@gmail.com");
            expect(response.body.favoriteProducts).toStrictEqual([]);
        });
    });
});
