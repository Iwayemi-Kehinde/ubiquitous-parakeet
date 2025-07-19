const express = require("express")
const authRoute = express.Router()
const {register, login, refreshToken, logout} = require("../controllers/auth.controller")

authRoute.post("/register", register)
authRoute.post("/login", login)
authRoute.post("/refresh-token", refreshToken)
authRoute.post("/logout", logout)

module.exports = authRoute