import express from "express";
import {showOrder,showOrders,createOrder,deleteOrder } from "../handlers/orders.js"

const router = express.Router();

router.get("/",showOrders)

router.get("/:orderId",showOrder)

router.post("/",createOrder)

router.delete("/:orderId",deleteOrder)

export default router;