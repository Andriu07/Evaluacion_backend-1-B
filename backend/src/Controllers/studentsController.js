import studentsModel from "../Models/students.js"

studentsController ={};

//get
//select
studentsController.getStudents = async (req , res) => {
    try {
        const students = await studentsModel.find();
        return res.status(200).json(students);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
};

//update
studentsController.updateStudents = async (req, res) =>{
    try {
        let{name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerfied,
            loginAttempts,
            timeOut
         } = req.body

         //validaciones
         name = name?.trim()
         name = email?.trim()

        // valores requeridos
        if(!name || ! email || !password){
            return res.status(400).json({message:"Campos requeridos"})
        }

        //validacion de fechas
        if(birthdate > new Date || birthdate < new Date ("19002-06-07")){
            return res.status(400).json({message:"fecha invalida"})
        }

        const studentsUpdated = await studentsModel.findByIdAndUpdate(
            req.params.id,{
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerfied,
            loginAttempts,
            timeOut
            },
            {new:true},
        );

        if(!studentsUpdated){
            return res.status(400).json({message:"no se encontro al estudiante"})
        }
        return res.status(200).json({message:"Estudiante actualizado"})
        } catch (error) {
         console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
        
    }
}

//eliminar 
studentsController.deleteStudents = async (req, res) => {
    try {
        const deleteStudents = studentsModel.findByIdAndDelete(req.params.id);
         
        //si no se elimina e sporque no se encontro el id
        if(!deleteStudents){
        return res.status(400).json({message:"no se encontro al estudiante"})
        }
        return res.status(200).json({message:"Estudiante eliminado"})

    } catch (error) {
         console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
};

export default studentsController;