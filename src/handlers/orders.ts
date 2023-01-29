import  { Request, Response } from "express";
import { OrdersStore } from "../models/orders";
import jwt from "jsonwebtoken"
const orderssMethods = new OrdersStore()

export const showOrders = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const order = await orderssMethods.index()
        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(401).send("unvalid token")
    }
}

export const showOrder = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const order = await orderssMethods.show(req.params.orderId)
        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(401).send("unvalid token")
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const order = await orderssMethods.create(req.body)
        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(401).send("unvalid token")
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const order = await orderssMethods.deleteO(req.params.orderId)
        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(401).send("unvalid token")
    }
}

