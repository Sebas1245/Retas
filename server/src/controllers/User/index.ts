import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "./UserController";

const router = express.Router({mergeParams: true});

router.post('/register', asyncHandler(UserController.register())); 
router.post('/login', asyncHandler(UserController.login())); 
router.put('/toggle_attendance', asyncHandler(UserController.toggleAttendance()))
router.get('/all_retas', asyncHandler(UserController.getAllRetasForUser()))

export default router;