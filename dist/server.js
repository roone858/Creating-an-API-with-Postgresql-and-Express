"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_1 = __importDefault(require("./routes/product"));
var orders_1 = __importDefault(require("./routes/orders"));
var users_1 = __importDefault(require("./routes/users"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
var port = 3000;
if (process.env.ENV === "test") {
    address = "0.0.0.0:3001";
    port = 3001;
}
app.use(body_parser_1["default"].json());
app.use("/products", product_1["default"]);
app.use("/orders", orders_1["default"]);
app.use("/users", users_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
