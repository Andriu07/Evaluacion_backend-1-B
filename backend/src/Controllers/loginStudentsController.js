import studentsModel from "../Models/students.js";
import bcryptjs from "bcrypytjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../../config.js";
import studentsModel from "../Controllers/studentsController.js";
import students from "../Models/students.js";

const loginStudentsController ={};

loginStudentController.login = async (req, res) =>{
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
        return res.status(403).json({message:"cuanta bloqueada"})
        }


        const isMatch = await bcrypt.compare(password,studentFound.password);
       
        if(!isMatch){
            studentFound.loginAttempts =(studentFound.loginAttempts || 0) + 1;
        }
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
}