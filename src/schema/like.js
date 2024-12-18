import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel : {
        type : String,
        required : true,
        enum : ["Post","Comment"],
    },
    likeableId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : "onModel",
    }
},{timestamps:true});

const Like = mongoose.model("Like",likeSchema);

export default Like;

