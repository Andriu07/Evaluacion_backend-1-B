import {Schema, model} from "mongoose";

const titionPaymentSchema = new Schema({
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Students"
    },
    amount:{
        type: Decimal128
    },
    paymentDate:{
        type:String
    },
    method:{
        type: String
    },
    status:{
        type: Boolean
    },
    referenceNumber:{
        type: String
    },
},
{
    timestamps:true,
    strict:false,
}
);

export default model("TitionPayment", titionPaymentSchema);