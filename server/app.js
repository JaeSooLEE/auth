import express from "express"
const app = express();
import {logRouter} from  './controller/logController.js'
import {authRouter} from './controller/tokenController.js'
import { usrRouter } from "./controller/userController.js";
import { mantesRouter } from "./controller/mantesController.js";
import cors from "cors"
app.use(cors())

app.use("/error", logRouter)
app.use("/auth", authRouter)
app.use("/login", usrRouter)
app.use("/mantes", mantesRouter)

app.listen(3000, (req, res) => {
    console.log('Express API is running at port 3000');
})

