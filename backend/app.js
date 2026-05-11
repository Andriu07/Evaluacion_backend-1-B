import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import studentsRoute from "./src/Routes/studentsRoute.js"
import teachersRoute from "./src/Routes/teachersRoute.js"






const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173" , "http://localhost:5174"],
    credentials: true,
}));


app.use("api/students", studentsRoute)
app.use("api/teachers", teachersRoute)























export default app;