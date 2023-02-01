"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const token = jsonwebtoken_1.default.sign({
    personid: 1,
    password: "1234",
}, tokenSecret);
describe("Product handlers: ", () => {
    it("should return a new product after it is created", () => {
        const data = {
            productid: 1,
            title: "shirt",
            price: 40,
        };
        request
            .post("/products/")
            .set("token", token)
            .send(data)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({
            productid: 1,
            title: "shirt",
            price: 40,
        });
    });
    it("should show all products", () => {
        request
            .get("/products")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect([
            {
                productid: 1,
                title: "shirt",
                price: 40,
            },
        ]);
    });
    it("should show a product given an id", () => {
        request
            .get("/products/1")
            .expect("Content-Type", /json/)
            .expect(200)
            .expect({
            productid: 1,
            title: "shirt",
            price: 40,
        });
    });
    it("should delete a product given its id", () => {
        request
            .delete("/products/1")
            .set("token", token)
            .expect(200)
            .then(() => {
            request.get("/products").expect("The product is deleted");
        });
    });
});
