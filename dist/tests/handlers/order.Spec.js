"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const request = (0, supertest_1.default)(server_1.default);
const token = jsonwebtoken_1.default.sign({
    personid: 1,
    password: "1234",
}, tokenSecret);
describe("Orders handler: ", () => {
    it("/orders/  create a new order ", () => {
        const data = {
            id: 1,
            user_id: 1,
            product_id: 1,
            status: "active",
            quantity: 10,
        };
        request
            .post("/api/orders/")
            .set("token", token)
            .send(data)
            .expect(200)
            .expect("Order added");
    });
    it("/orders should show all orders", () => {
        request
            .get("/orders")
            .expect("Content-Type", "application/json")
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: "new",
        });
    });
    it("/orders/:id show a order", () => {
        request
            .get("/orders/1")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", "application/json")
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: "new",
        });
    });
    it("/orders/:id should delete an order given its id", () => {
        request
            .delete("/orders/1")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: "in progress",
        });
    });
    it("/orders/current-order/:id should show orders with status not completed", () => {
        request
            .get("/api/orders/current-order/1")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect(`Order with id 1 is deleted`);
    });
});
