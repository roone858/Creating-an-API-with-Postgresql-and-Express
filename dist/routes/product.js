"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var products_js_1 = require("../handlers/products.js");
var router = express_1["default"].Router();
router.get("/", products_js_1.showProducts);
router.get("/:id", products_js_1.showProduct);
router.post("/", products_js_1.createProduct);
router["delete"]("/:id", products_js_1.deleteProduct);
exports["default"] = router;
