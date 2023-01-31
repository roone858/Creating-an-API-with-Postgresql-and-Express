"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_js_1 = require("../handlers/products.js");
const router = express_1.default.Router();
router.get("/", products_js_1.showProducts);
router.get("/:id", products_js_1.showProduct);
router.post("/", products_js_1.createProduct);
router.delete("/:productId", products_js_1.deleteProduct);
exports.default = router;
