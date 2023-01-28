import { UsersStore } from "../models/users"
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"
const store = new UsersStore()

export const showUsers = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const users = await store.showAll()
        res.json(users)
    } catch (err) {
        res.status(401).send("token not valid")
    }

}
export const showUser = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const user = await store.show(req.params.personId)
        res.json(user)
    } catch (err) {
        res.send("invalid token try to log in from 'users/login' to get token'")
    }

}
export const createUser = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const user = await store.create(req.body)
        res.send(user)

    } catch (err) {
        res.send("invalid token try to log in from 'users/login' to get token'")
    }

}
export const deleteUser = async (req: Request, res: Response) => {
    try {
        jwt.verify(String(req.headers.token), "my secret")
        const user = await store.deleteu(req.params.personId)
        res.json(user)

    } catch (err) {
        res.send("invalid token try to log in from 'users/login' to get token'")
    }

}
export const checkUser = async (req: Request, res: Response) => {
    try {
        const b = await store.check(req.body.personId, req.body.password)
        let user = {
            personid: req.body.personId,
            password: req.body.password
        }
        console.log(user);
        b ? res.send("correct Welcome back!" + jwt.sign(user, 'my secret')) : res.send("the password is uwrong")

    } catch (err) {
        console.log(err)
        res.status(404).send("sorry Could not Find The User ")


    }

}