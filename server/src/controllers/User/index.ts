import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "./UserController";
import { isLoggedIn } from '../../middleware/checkAuth';

const router = express.Router({mergeParams: true});

router.post('/register', asyncHandler(UserController.register())); 
router.post('/login', asyncHandler(UserController.login())); 
router.put('/toggle_attendance', asyncHandler(isLoggedIn), asyncHandler(UserController.toggleAttendance()));
router.get('/all_retas', asyncHandler(isLoggedIn), asyncHandler(UserController.getAllRetasForUser()))

export default router;