import express from "express";
import asyncHandler from "express-async-handler";
import RetaController from "./RetaController";

const router = express.Router({mergeParams: true});

router.post('/', asyncHandler(RetaController.create()))
router.get('/', asyncHandler(RetaController.readOne()))
router.get('/all', asyncHandler(RetaController.readAll()))

export default router;