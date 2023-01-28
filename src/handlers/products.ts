import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/products";
import jwt from "jsonwebtoken"
const productsMethods = new ProductStore()

export const showProducts = async (_req: Request, res: Response) => {
    const product = await productsMethods.showAll()
    res.json(product)
}

export const showProduct = async (req: Request, res: Response) => {
    const product = await productsMethods.show(req.params.id)
    res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
    try{
        jwt.verify(req.body.token, "my secret")
    const product = await productsMethods.create(req.body)
    res.json(product)
    }catch(err){
        console.log(err)
        res.status(401).send("unvalid token")  
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const product = await productsMethods.deleteP(req.params.id)
    res.json(product)
}

