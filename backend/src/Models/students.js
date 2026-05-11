import {Schema, model} from "mongoose";

const studentsSchema = new Schema({
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    birthdate:{
        type:String
    },
    carnet:{
        type:Number
    },
    especiality_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Specialitys"
    },
    phone:{
        type:String
    },
    isVerified:{
        type:Boolean
    },
    loginAttempts:{
        type:Number
    },
    timeOut:{
        type:Date
    },
    especiality_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Specialitys"
    },
},
{
    timestamps:true,
    strict:false,
}
);

export default model("Students", studentsSchema);