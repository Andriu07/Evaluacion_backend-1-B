import subjectModel from "../Models/subject.js";

subjectController = {};

//get
subjectController.getSubject = async (req, res) =>{
    const subject = await subjectModel.find();
    res.json(subject);
}

//post
subjectController.insertSubject  = async (req, res) =>{
    const{
        subjectName, 
        teacher_id,
        isAvailable
    } = req.body;
    const newSubject = new subjectModel({
        subjectName, 
        teacher_id,
        isAvailable
    })

    await newSubject.save();
    res.json({message:"Subject saved"})
}

//update
subjectController.upateSubject = async (req, res) =>{
    const{
        subjectName, 
        teacher_id,
        isAvailable
    } = req.body;

    await subjectModel.findByIdAndUpdate(req.params.id, {
        subjectName, 
        teacher_id,
        isAvailable
    },{new: true});
    res.json({message:"materia actualizada"})
}

//eliminar
subjectController.deleteSubject = async (req, res) =>{
    await subjectModel.findByIdAndDelete(req.params.id);
    res.json({message:"materia eliminada"});
};


export default subjectController;