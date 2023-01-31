"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.createOrder = exports.showOrder = exports.showOrders = void 0;
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const orderssMethods = new orders_1.OrdersStore();
const showOrders = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const order = await orderssMethods.index();
        res.json(order);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.showOrders = showOrders;
const showOrder = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const order = await orderssMethods.show(req.params.orderId);
        res.json(order);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.showOrder = showOrder;
const createOrder = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const order = await orderssMethods.create(req.body);
        res.json(order);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.createOrder = createOrder;
const deleteOrder = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const order = await orderssMethods.deleteO(req.params.orderId);
        res.json(order);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.deleteOrder = deleteOrder;
