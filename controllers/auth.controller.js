const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")

exports.register = async (req, res) => {
    const { email, password, name } = req.body
    try {
        const userExists = await UserModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "Email is already in use by another user" })
        }
        const user = await UserModel.create({ email, password, name })
        res.status(200).json({
            message: "User Registered Successfully",
            user
        })
    } catch (error) {
        console.log(`Error occured during register user: ${error.message}`)
        return res.status(500).json({ message: 'Server error' });
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email }).select("+password")
        if (!user) return res.status(400).json({ message: "Invalid Credentials" })
        const passwordExists = await user.comparePassword(password)
        if (!passwordExists) return res.status(400).json({ message: "Invalid Credentials" })
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        res.cookie("refresh_token", refreshToken, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        res.status(200).json({
            message: "Login successful",
            accessToken,
            user
        })
    } catch (error) {
        console.log(`Error occured during Login ${error.message}`)
        return res.status(500).json({ message: "Server Error" })
    }
}



exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    if (!refreshToken) return res.status(404).json({ message: "Token not found" })
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await UserModel.findById(payload.id)
        if (!user) return res.status(401).json({ message: "Invalid Refresh Token" })
        const accessToken = generateAccessToken(user)
        return res.status(200).json({ accessToken })
    } catch (error) {
        return res.status(403).json({ message: "Refresh Token Expired or Invalid" })
    }
}


exports.logout = async (req, res) => {
    res.clearCookie("refresh_token", {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        httpOnly: true
    })
    res.status(200).json({
        message: "Logout Successful"
    })
}


