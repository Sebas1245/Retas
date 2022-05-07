import express from "express";
import asyncHandler from "express-async-handler";
import UserController from "./UserController";
import { isLoggedIn } from '../../middleware/checkAuth';

const router = express.Router({mergeParams: true});

router.post('/register', asyncHandler(UserController.register())); 
router.post('/login', asyncHandler(UserController.login())); 
router.put('/toggle_attendance', asyncHandler(isLoggedIn), asyncHandler(UserController.toggleAttendance()));
router.get('/all_retas_as_admin', asyncHandler(isLoggedIn), asyncHandler(UserController.getAllRetasForUserAsAdmin()))
router.get('/all_retas_as_participant', asyncHandler(isLoggedIn), asyncHandler(UserController.getAllRetasForUserAsParticipant()))
router.get('/is_user_in_reta/:retaId',asyncHandler(isLoggedIn), asyncHandler(UserController.isUserInReta()))
router.put('/', asyncHandler(isLoggedIn), asyncHandler(UserController.update()));

export default router;