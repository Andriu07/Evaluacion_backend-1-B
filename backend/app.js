import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import studentsRoute from "./src/Routes/studentsRoute.js";
import teachersRoute from "./src/Routes/teachersRoute.js";
import registerStudentsRoute from "./src/Routes/registerStudedntsRoute.js";
import registerTeachersRoute from "./src/Routes/registerTeachersRoute.js";
import loginStudentsRoute from "./src/Routes/loginStudentsRoute.js";
import loginTeachersRoute from "./src/Routes/loginTeachersRoute.js";
import logoutRoute from "./src/Routes/logoutRoute.js";
import recoveryPasswordStudentRoute from "./src/Routes/recoveryPasswordStudentRoute.js";
import recoveryPaswordTeachersRoute from "./src/Routes/recoveryPasswordRoute.js";
import titionPaymentRoute from "./src/Routes/titionPaymentRoute.js";
import specialitysRoute from "./src/Routes/specialitysRoute.js";
import subjectRoute from "./src/Routes/subjectRoute.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173" , "http://localhost:5174"],
    credentials: true,
}));


app.use("api/students", studentsRoute)
app.use("api/teachers", teachersRoute)
app.use("api/subject", subjectRoute)
app.use("api/titionPayment", titionPaymentRoute)
app.use("api/specialitys", specialitysRoute)
app.use("api/recoveryPaswordTeachers", recoveryPaswordTeachersRoute)
app.use("api/recoveryPasswordStudent", recoveryPasswordStudentRoute)
app.use("api/loginTeachers", loginTeachersRoute)
app.use("api/logout", logoutRoute)
app.use("api/loginStudents", loginStudentsRoute )
app.use("api/registerTeachers", registerTeachersRoute)
app.use("api/registerStudents", registerStudentsRoute)

export default app;