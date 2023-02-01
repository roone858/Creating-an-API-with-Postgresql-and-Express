import { Request, Response } from "express";
import { ProductStore } from "../models/products";

const productsMethods = new ProductStore();

export const showProducts = async (_req: Request, res: Response) => {
  const product = await productsMethods.index();
  res.json(product);
};

export const showProduct = async (req: Request, res: Response) => {
  try {
    const product = await productsMethods.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(401).json(err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productsMethods.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(401).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productsMethods.deleteP(req.params.productId);
    product
      ? res.send("The product is deleted")
      : res.send("The product not found");
  } catch (err) {
    res.status(401).json(err);
  }
};
