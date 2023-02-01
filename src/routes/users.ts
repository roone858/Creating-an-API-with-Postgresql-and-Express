import {
  showUsers,
  showUser,
  createUser,
  deleteUser,
  checkUser,
} from "../handlers/users";
import express from "express";
import { authorisation } from "../middleware/authorisation";
const router = express.Router();

router.get("/", authorisation, showUsers);
router.get("/:personId", authorisation, showUser);
router.post("/", authorisation, createUser);
router.post("/login", checkUser);

router.delete("/:personId", authorisation, deleteUser);

export default router;
