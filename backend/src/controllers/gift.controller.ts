import { Request, Response } from "express";
import Gift from "../models/gift.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { handleUpload } from "../services/cloudinary.js";

const createGift = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name?.trim()) {
        throw new ApiError(400, "Name is required");
    }

    if (!req.file?.path) {
        throw new ApiError(400, "Image is required");
    }

    const uploadedImage = await handleUpload(req.file.path);
    if (!uploadedImage?.secure_url) {
        throw new ApiError(500, "Image upload failed");
    }

    const gift = await Gift.create({
        name: name.trim(),
        image: uploadedImage.secure_url,
    });

    res.status(201).json(new ApiResponse(201, { gift }, "Gift created successfully"));
});


const getGifts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const gifts = await Gift.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(new ApiResponse(200, { gifts }, "Gifts fetched successfully"));
});


export { createGift , getGifts };
