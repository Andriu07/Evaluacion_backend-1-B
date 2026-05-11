import {Schema, model} from "mongoose";

const specialitysSchema = new Schema({
    specialityName:{
        type:String
    },
    isAvailable:{
        type:Boolean
    },
},
{
    timestamps:true,
    strict:false,
}
);

export default model("Specialitys", specialitysSchema);