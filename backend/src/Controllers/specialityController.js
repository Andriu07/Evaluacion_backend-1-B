import specialityModel from "../Models/speciality.js";

specialityController = {};

//get
specialityController.getSpeciality = async (req, res) =>{
    const speciality = await specialityModel.find();
    res.json(speciality);
}

//post
specialityController.insertSpeciality  = async (req, res) =>{
    const{
        specialityName, 
        isAvailable
    } = req.body;
    const newSpeciality = new subjectModel({
       specialityName, 
        isAvailable
    })

    await newSpeciality.save();
    res.json({message:"Speciality saved"})
}

//update
subjectController.upateSpeciality = async (req, res) =>{
    const{
       specialityName, 
        isAvailable
    } = req.body;

    await specialityModel.findByIdAndUpdate(req.params.id, {
      specialityName, 
        isAvailable
    },{new: true});
    res.json({message:"especialidad actualizada"})
}

//eliminar
specialityController.deleteSpeciality = async (req, res) =>{
    await specialityModel.findByIdAndDelete(req.params.id);
    res.json({message:"especialidad eliminada"});
};


export default specialityController;