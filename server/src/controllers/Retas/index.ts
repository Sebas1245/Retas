import express from "express";
import asyncHandler from "express-async-handler";
import RetaController from "./RetaController";
import { isLoggedIn } from "../../middleware/checkAuth";

const router = express.Router({mergeParams: true});

router.post('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.create()))
router.get('/:retaId', asyncHandler(RetaController.readOne()))
router.get('/get_all', asyncHandler(RetaController.readAll()))
router.delete('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.delete()));
router.put('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.update()));

export default router;