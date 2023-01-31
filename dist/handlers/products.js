"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.showProduct = exports.showProducts = void 0;
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const productsMethods = new products_1.ProductStore();
const showProducts = async (_req, res) => {
    const product = await productsMethods.index();
    res.json(product);
};
exports.showProducts = showProducts;
const showProduct = async (req, res) => {
    try {
        const product = await productsMethods.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.showProduct = showProduct;
const createProduct = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const product = await productsMethods.create(req.body);
        res.json(product);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const product = await productsMethods.deleteP(req.params.productId);
        product ? res.send("The product is deleted") : res.send("The product not found");
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.deleteProduct = deleteProduct;
