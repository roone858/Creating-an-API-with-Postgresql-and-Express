import express from "express";
import {
  showOrder,
  showOrders,
  createOrder,
  deleteOrder,
} from "../handlers/orders.js";
import { authorisation } from "../middleware/authorisation";

const router = express.Router();

router.get("/", authorisation, showOrders);

router.get("/:orderId", authorisation, showOrder);

router.post("/", authorisation, createOrder);

router.delete("/:orderId", authorisation, deleteOrder);

export default router;
