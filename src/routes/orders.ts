import express from "express";
import {showOrder,showOrders,createOrder,deleteOrder } from "../handlers/orders.js"

const router = express.Router();

router.get("/",showOrders)

router.get("/:id",showOrder)

router.post("/",createOrder)

router.delete("/:id",deleteOrder)

export default router;