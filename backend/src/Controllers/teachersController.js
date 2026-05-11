import teachersModel from "../Models/teachers.js"

teachersController ={};

//get
//select
teachersController.getTeachers = async (req , res) => {
    try {
        const teachers = await teachersModel.find();
        return res.status(200).json(teachers);
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
};

//update
teachersController.updateTeachers = async (req, res) =>{
    try {
        let{name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            hireDate,
            isActive,
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

        const teachersUpdated = await teachersModel.findByIdAndUpdate(
            req.params.id,{
            name,
            lastName,
            email,
            password,
            birthdate,
            phone,
            hireDate,
            isActive,
            isVerfied,
            loginAttempts,
            timeOut
            },
            {new:true},
        );

        if(!teachersUpdated){
            return res.status(400).json({message:"no se encontro al profesor"})
        }
        return res.status(200).json({message:"Profesor  actualizado"})
        } catch (error) {
         console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
        
    }
}

//eliminar 
teachersController.deleteTeachers = async (req, res) => {
    try {
        const deleteTeachers = teachersModel.findByIdAndDelete(req.params.id);
         
        //si no se elimina e sporque no se encontro el id
        if(!deleteTeachers){
        return res.status(400).json({message:"no se encontro al profesor"})
        }
        return res.status(200).json({message:"Profesor eliminado"})

    } catch (error) {
         console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
};

export default teachersController;