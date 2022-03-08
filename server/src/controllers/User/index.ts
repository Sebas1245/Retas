import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "./UserController";

const router = express.Router({mergeParams: true});
const userCtr = new UserController();

router.post('/register', asyncHandler(userCtr.register())); 

export default router;