import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {config} from "../../config.js";
import studentsModal from "../Models/students.js";


const registerStudentController = {};

registerStudentController.register = async (req , res) =>{
    const{
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
    } = req.body;

    try {
        const existStudents = await studentsModal.findOne({email});
        if(existStudents){
            return res.status(400).json({message:"student alredy exists"})
        }

        //encriptar la contraseña
        const passwordHashed = bcryptjs.hash(password, 10)
        //generar un codigo aleatorio
        const randomNumber = crypto.randomBytes(3).toString("hex")

        //guardamos en nun token la informacion
        const token =jsonwebtoken.sign(
            {
            randomNumber,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerfied,
            loginAttempts,
            timeOut 
            },
            config.JWT.secret,
            {expiresIn:"15m"},
        )
         res.cookie("RegistrationCookieStudent", token ,{maxAge: 15 * 60 * 1000});

         //creamos el transporter quien lo envia
         const transporter = nodemailer.createTransport({
            service: email,
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
         })

          // quine lo recibe
          const mailOptions ={
            from: config.email.user.email,
            to: email,
            subject:"Verificaionde cuenta",
            text:"para verificar tu cuenta, utiliza este codigo:" + randomNumber + " expira en 15 min"
          }

          //enviar el correo
          transporter.sendMail(mailOptions,(error, info) =>{
            if(error){
        return res.status(500).json({message:"error sending email"})
            }
         return res.status(200).json({message:"email sent"})
          })
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }


    //verificar el codigo que acabamos de enviar
    registerStudentController.verifyCode = async (req, res) =>{
        try {
            const{verificationCodeRequest} = req.body;
            
            //obtener el token de las cookies
            const token = req.cookies.RegistrationCookieStudent;

            //extraer toda la indo del token 
            const decoded = jsonwebtoken.verify(token, config.JWT.secret);
            const{randomNumber: storedCode, name,
            lastName,
            email,
            password: passwordHashed,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerfied,
            loginAttempts,
            timeOut 
            } = decoded;

            //compara los codigos 
            if(verificationCodeRequest !== storedCode){
                return res.status(400).json({message:"Invalid code"})
            }

            //si todod esta bien eñ usuario recibe el codigo y los registramos en la db
            const newStudent = new studentsModal({
            name,
            lastName,
            email,
            password: passwordHashed,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerfied,
            loginAttempts,
            timeOut 
            });

            await newStudent.save();
            res.clearCookie("RegistrationCookieStudent")
             return res.status(200).json({message:"estudiante registrado"})
        } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
        }
    }
};

export default registerStudentController;