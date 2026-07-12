import mongoose from "mongoose";

export interface IGift {
    _id? : mongoose.Types.ObjectId;
    name : string;
    image : string;
}