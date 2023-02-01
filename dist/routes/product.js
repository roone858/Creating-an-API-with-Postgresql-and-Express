"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var products_js_1 = require("../handlers/products.js");
var authorisation_1 = require("../middleware/authorisation");
var router = express_1["default"].Router();
router.get("/", products_js_1.showProducts);
router.get("/:id", products_js_1.showProduct);
router.post("/", authorisation_1.authorisation, products_js_1.createProduct);
router["delete"]("/:productId", authorisation_1.authorisation, products_js_1.deleteProduct);
exports["default"] = router;
