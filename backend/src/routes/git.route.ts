import { Router } from "express";
import { getGifts , createGift } from "../controllers/gift.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/gifts').get(getGifts).post(upload.single("image"), createGift);

export default router;