"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.deleteUser = exports.createUser = exports.showUser = exports.showUsers = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = String(process.env.TOKEN_SECRET);
const store = new users_1.UsersStore();
const showUsers = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.showUsers = showUsers;
const showUser = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const user = await store.show(req.params.personId);
        res.json(user);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.showUser = showUser;
const createUser = async (req, res) => {
    try {
        const user = await store.create(req.body);
        res.send(user);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        jsonwebtoken_1.default.verify(String(req.headers.token), tokenSecret);
        const user = await store.deleteu(req.params.personId);
        res.json(user);
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.deleteUser = deleteUser;
const checkUser = async (req, res) => {
    try {
        const b = await store.check(req.body.personid, req.body.password);
        let user = {
            personid: req.body.personid,
            password: req.body.password
        };
        b ? res.send("correct Welcome back!" + jsonwebtoken_1.default.sign(user, tokenSecret)) : res.send("the password is uwrong");
    }
    catch (err) {
        res.status(401).json(err);
    }
};
exports.checkUser = checkUser;
