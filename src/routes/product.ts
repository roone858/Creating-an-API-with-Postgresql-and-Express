import express from "express";
import {
  showProduct,
  showProducts,
  createProduct,
  deleteProduct,
} from "../handlers/products.js";
import { authorisation } from "../middleware/authorisation";

const router = express.Router();

router.get("/", showProducts);

router.get("/:id", showProduct);

router.post("/", authorisation, createProduct);

router.delete("/:productId", authorisation, deleteProduct);

export default router;
