"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var users_1 = require("../handlers/users");
var express_1 = __importDefault(require("express"));
var authorisation_1 = require("../middleware/authorisation");
var router = express_1["default"].Router();
router.get("/", authorisation_1.authorisation, users_1.showUsers);
router.get("/:personId", authorisation_1.authorisation, users_1.showUser);
router.post("/", authorisation_1.authorisation, users_1.createUser);
router.post("/login", users_1.checkUser);
router["delete"]("/:personId", authorisation_1.authorisation, users_1.deleteUser);
exports["default"] = router;
