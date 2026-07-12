import mongoose from "mongoose";
import { IGift } from "../../types/gitModel.type.js";

const giftSchema = new mongoose.Schema<IGift>(
    {
        name : {type : String, required : true},
        image : {type : String, required : true},
    },
    {
        timestamps : true,
    }
) 

const Gift = mongoose.model<IGift>("Gift" , giftSchema);
export default Gift;

