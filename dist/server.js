"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./routes/product"));
const orders_1 = __importDefault(require("./routes/orders"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
let address = "0.0.0.0:3000";
let port = 3000;
if (process.env.ENV === "test") {
    address = "0.0.0.0:3001";
    port = 3001;
}
app.use(body_parser_1.default.json());
app.use("/products", product_1.default);
app.use("/orders", orders_1.default);
app.use("/users", users_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
