import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "./UserController";

const router = express.Router({mergeParams: true});

router.post('/register', asyncHandler(UserController.register())); 
router.post('/login', asyncHandler(UserController.login())); 

export default router;