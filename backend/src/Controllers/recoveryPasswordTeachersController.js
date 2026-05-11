import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {config} from "../../config.js";
import teachersModel from "../Models/teachers.js";


const recoveryPasswordTeachersController ={};

//mandar correo
recoveryPasswordTeachersController.requestCode = async (req , res) => {
 try {
    const{email} = req.body;
    const userFound = await teachersModel.findOne({email})
    if(!userFound){
        return res.status(404).json({message:"usuario no encontrado"})
    }

    //generar codigo alatorio
    const randomCode = crypto.randomBytes(8).toString("hex")

    //generar el token
                const token = jsonwebtoken.sign(
                    {email, randomCode, userType :"Teacher", verified: false},
                    config.JWT.secret,
                    {expiresIn:"15m"}
                )
                  res.cookie("recoveryCookie". token ,{maxAge: 15* 60 *1000})
                  
                  //quien lo envia
                   //creamos el transporter quien lo envia
                           const transporter = nodemailer.createTransport({
                              service: gmail,
                              auth:{
                                  user: config.email.user_email,
                                  pass: config.email.user_password
                              }
                           })


                            // quine lo recibe
          const mailOptions ={
            from: config.email.user.email,
            to: email,
            subject:"Codigo de verificacion",
            body:"El codigo expira en 15 min"
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
};

//codigo de verificacion
recoveryPassswordTeachersController.verifyCode = async (req, res) => {
    try {
        const{code} = req.body;
        const token = req.cookies.recoveryCookie;
        
        const decoded = jsonwebtoken.verify(token.config.JWT.secret)

        if(!code == decoded.randomCode){
            return res.status(400).json({message:"inavlid code"})
        }


       const newtoken = jsonwebtoken.sign(
                    {email: decoded.email, userType :"Student", verified: true},
                    config.JWT.secret,
                    {expiresIn:"15m"},
                   )
                   res.cookie("recoveryCookie", token ,{maxAge: 15 * 60 * 1000});
                  return res.status(200).json({messag:"Codigo verificado satisfactoriamente"});
                  
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
}

//nueva contraseña

recoveryPasswordTeachersController.newPassword = async (req, res) => {
    try {
        const{newPassword, confirmnewPassword} =req.body;

        if(newPassword !== confirmnewPassword){
             return res.status(400).json({message:"password doesnt matched"})
        }

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)

        if(!decoded.verified){
             return res.status(400).json({message:"codigo no verificado"})
        }


        // encriptar
    
        const passwordHashed = await bcrypt.hash(newPassword, 10)
        await studentModel.findOneAndUpdate(
            {email:decoded.email},
            {password:passwordHashed},
            {new:true},
        )

        //limpiar la cookie
        res.clearCoookie("recoveryCookie")
         return res.status(200).json({messag:"Contraseña actualizada"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal sever error"})
    }
};

export default recoveryPassswordTeachersController;