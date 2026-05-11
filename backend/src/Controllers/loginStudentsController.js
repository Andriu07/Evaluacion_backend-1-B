import studentsModel from "../Models/students.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js";


const loginStudentsController ={};

loginStudentsController.login = async (req, res) =>{
    //solicito los datos
    const{ email,password} = req.body;
    const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
      return res.status(400).json({message:"correo invalido"})
    }
    try {
        const studentFound = await studentsModel.findOne({email});

        if (!studentFound){
            return res.status(400).json({message:"studiante no encontrado"})
        }

        if (studentFound.timeOut && studentFound.timeOut > Date.now()){
        return res.status(403).json({message:"cuenta bloqueada"})
        }


        const isMatch = await bcrypt.compare(password,studentFound.password);
       
        if(!isMatch){
            studentFound.loginAttempts =(studentFound.loginAttempts || 0) + 1;
        }

        //si llega a 5 intentos se bloque la cuenta
        if(studentFound.loginAttempts >= 5){
            studentFound.timeOut = Date.now() + 5* 60* 1000;
            studentFound.loginAttempts = 0;

            await studentFound.save();
            return res.status(403).json({message:"cuanta bloqueada por multiples intentos fallidos"})
            }
          //resetear intentos si login correctos
            studentFound.loginAttempts = 0;
            studentFound.timeOut = null;

            //generar el token
            const token = jsonwebtoken.sign(
                {id: studentFound._id, userType :"Student"},
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

export default loginStudentsController;