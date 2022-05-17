import express from "express";
import asyncHandler from "express-async-handler";
import RetaController from "./RetaController";
import { isLoggedIn } from "../../middleware/checkAuth";

const router = express.Router({mergeParams: true});

router.post('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.create()))
router.get('/get_all', asyncHandler(isLoggedIn), asyncHandler(RetaController.readAll()))
router.delete('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.delete()));
router.put('/', asyncHandler(isLoggedIn), asyncHandler(RetaController.update()));
router.get('/get_all_by_category/:category', asyncHandler(RetaController.getRetasByCategory()));
router.get('/get_by_query', asyncHandler(RetaController.getRetasBySearchBarQuery()))
router.get('/:retaId', asyncHandler(RetaController.readOne()))

export default router;