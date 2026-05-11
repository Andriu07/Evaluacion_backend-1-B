import teachersModel from "../Models/teachers.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js";

const loginTeachersController ={};

loginTeachersController.login = async (req, res) =>{
    //solicito los datos
    const{ email,password} = req.body;
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
      return res.status(400).json({message:"correo invalido"})
    }
    try {
        const teacherFound = await teachersModel.findOne({email});

        if (! teacherFound ){
            return res.status(400).json({message:"studiante no encontrado"})
        }

        if ( teacherFound.timeOut && studentFound.timeOut > Date.now()){
        return res.status(403).json({message:"cuanta bloqueada"})
        }


        const isMatch = await bcrypt.compare(password,teacherFound.password);
       
        if(!isMatch){
            teacherFound.loginAttempts =(teacherFound.loginAttempts || 0) + 1;
        }

        //si llega a 5 intentos se bloque la cuenta
        if(teacherFoundd.loginAttempts >= 5){
            teacherFound.timeOut = Date.now() + 5* 60* 1000;
           teacherFound.loginAttempts = 0;

            await teacherFound.save();
            return res.status(403).json({message:"cuanta bloqueada por multiples intentos fallidos"})
        }
    
          //resetear intentos si login correctos
            teacherFound.loginAttempts = 0;
            teacherFound.timeOut = null;

            //generar el token
            const token = jsonwebtoken.sign(
                {id: teacherFound._id, userType :"Student"},
                config.JWT.secret,
                {expiresIn:"30d"}
            );

            //el token lo guardamos en un coookie
            res.cookie("authCoookie", token);
            return res.status(200).json({message:"login exitoso"});

    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
}

export default loginTeachersController;