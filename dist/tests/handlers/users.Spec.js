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
describe("Users handlers: ", () => {
    it("/users should return a created user", () => {
        const data = {
            personid: 1,
            username: "ssmith",
            firstname: "Sallie",
            lastname: "Test",
            email: "Test",
            password: "1234",
        };
        request
            .post("/users/")
            .send(data)
            .expect("Content-Type", "application/json")
            .expect(201)
            .expect(data);
    });
    it("/users should return all users", () => {
        request
            .get("/users")
            .set("token", token)
            .expect(200)
            .expect("Content-Type", "application/json")
            .expect([
            {
                personid: 1,
                username: "ssmith",
                firstname: "Sallie",
                lastname: "Test",
                email: "Test",
                password: "1234"
            },
        ]);
    });
    it("/users/:id should show a user", () => {
        request
            .get("/users/1")
            .set("token", token)
            .expect("Content-Type", "application/json")
            .expect(200)
            .expect({
            personid: 1,
            username: "ssmith",
            firstname: "Sallie",
            lastname: "Test",
            email: "Test",
            password: "1234",
        });
    });
    it("/users/:id should delete a user", () => {
        request.delete("/users/1").expect(200).expect("user deleted");
    });
});
