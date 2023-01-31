"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_js_1 = require("../handlers/orders.js");
const router = express_1.default.Router();
router.get("/", orders_js_1.showOrders);
router.get("/:orderId", orders_js_1.showOrder);
router.post("/", orders_js_1.createOrder);
router.delete("/:orderId", orders_js_1.deleteOrder);
exports.default = router;
