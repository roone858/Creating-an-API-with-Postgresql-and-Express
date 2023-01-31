"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../handlers/users");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", users_1.showUsers);
router.get("/:personId", users_1.showUser);
router.post("/", users_1.createUser);
router.post("/login", users_1.checkUser);
router.delete("/:personId", users_1.deleteUser);
exports.default = router;
