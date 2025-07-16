const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

//Middlewares
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


//Routes
const authRoute = require("./routes/auth.routes")
app.use("/api/auth", authRoute)


module.exports = app