import {Schema, model} from "mongoose";

const subjectsSchema = new Schema({
    subjectName:{
        type:String
    },
    tecaher_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teachers"
    },
    isAvailable:{
        type: Boolean
    },
},
{
    timestamps:true,
    strict:false,
}
);

export default model("Subjects", subjectsSchema);