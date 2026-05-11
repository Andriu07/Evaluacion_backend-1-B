import titionPaymentModel from "../Models/titionPayment.js";

titionPaymentController = {};

//get
titionPaymentController.getSubject = async (req, res) =>{
    const titionPayment = await subjectModel.find();
    res.json(titionPayment);
}

//post
titionPaymentController.insertTitionPayment  = async (req, res) =>{
    const{
        student_id, 
        amount,
        paymentDate,
        method,
        status,
        referenceNumber
    } = req.body;
    
    const newTitionPayment = new titionPaymentModel({
      student_id, 
        amount,
        paymentDate,
        method,
        status,
        referenceNumber
    })

    await newTitionPayment.save();
    res.json({message:"TitionPayment saved"})
}

//update
titionPaymentController.upateTitionPayment = async (req, res) =>{
    const{
      student_id, 
        amount,
        paymentDate,
        method,
        status,
        referenceNumber
    } = req.body;

    await titionPaymentModel.findByIdAndUpdate(req.params.id, {
       student_id, 
        amount,
        paymentDate,
        method,
        status,
        referenceNumber
    },
    {new: true});
    res.json({message:"Pago de matricula actualizada"})
}

//eliminar
titionPaymentController.deleteTitionPayment = async (req, res) =>{
    await titionPaymentModel.findByIdAndDelete(req.params.id);
    res.json({message:"pago de matricula eliminado"});
};


export default titionPaymentController;