import express from "express";
import {showProduct,showProducts,createProduct,deleteProduct } from "../handlers/products.js"

const router = express.Router();

router.get("/",showProducts)

router.get("/:id",showProduct)

router.post("/",createProduct)

router.delete("/:productId",deleteProduct)

export default router;