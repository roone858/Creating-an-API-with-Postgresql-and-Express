"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orders_js_1 = require("../handlers/orders.js");
var authorisation_1 = require("../middleware/authorisation");
var router = express_1["default"].Router();
router.get("/", authorisation_1.authorisation, orders_js_1.showOrders);
router.get("/:orderId", authorisation_1.authorisation, orders_js_1.showOrder);
router.post("/", authorisation_1.authorisation, orders_js_1.createOrder);
router["delete"]("/:orderId", authorisation_1.authorisation, orders_js_1.deleteOrder);
exports["default"] = router;
