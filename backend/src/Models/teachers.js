import {Schema, model} from "mongoose";

const teachersSchema = new Schema({
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
    phone:{
        type:String
    },
    hireDate:{
        type: Date
    },
    isActive:{
        type:Boolean
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
},
{
    timestamps:true,
    strict:false,
}
);

export default model("Teachers", teachersSchema);