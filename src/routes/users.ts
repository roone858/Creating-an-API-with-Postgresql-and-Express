import { showUsers, showUser, createUser, deleteUser,checkUser} from "../handlers/users"
import express from "express";

const router = express.Router();

router.get("/", showUsers)
router.get("/:personId", showUser)
router.post("/", createUser)
router.post("/login", checkUser)

router.delete("/:personId", deleteUser)

export default router; 