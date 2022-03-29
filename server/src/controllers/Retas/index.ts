import express from "express";
import asyncHandler from "express-async-handler";
import RetaController from "./RetaController";

const router = express.Router({mergeParams: true});

router.post('/', asyncHandler(RetaController.create()))
router.get('/', asyncHandler(RetaController.readOne()))
router.get('/get_all', asyncHandler(RetaController.readAll()))
router.delete('/', asyncHandler(RetaController.delete()));
router.put('/', asyncHandler(RetaController.update()));

export default router;