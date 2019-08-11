"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetUserDetail_1 = require("./apiGetUserDetail");
const apiAddUser_1 = require("./apiAddUser");
const apiDeleteUser_1 = require("./apiDeleteUser");
const apiUpdateUser_1 = require("./apiUpdateUser");
exports.userRouter = express_1.Router();
// userRouter.get("/:id", apiGetUserDetail);
// userRouter.post("/", apiAddUser);
// userRouter.delete("/:id", apiDeleteUser);
// userRouter.patch("/:id", apiUpdateUser);
exports.userRouter.post("/", apiAddUser_1.apiAddUser);
exports.userRouter
    .route("/:id")
    .get(apiGetUserDetail_1.apiGetUserDetail)
    .delete(apiDeleteUser_1.apiDeleteUser)
    .patch(apiUpdateUser_1.apiUpdateUser);
