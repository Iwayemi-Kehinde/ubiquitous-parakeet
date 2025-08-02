const express = require("express")
const { verifyToken } = require("../middlewares/auth")
const { getMe, updateMe, updatePassword, updateAddresses, forgotPassword, resetPassword } = require("../controllers/user.controller")

const userRouter = express()

userRouter.get("/me", verifyToken, getMe)
userRouter.put("/me", verifyToken, updateMe)
userRouter.put("/me/password", verifyToken, updatePassword)
userRouter.put("/me/addresses", verifyToken, updateAddresses)
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

module.exports = userRouter