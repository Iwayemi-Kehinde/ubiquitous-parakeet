const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user, admin, superadmin"], default: "user" }
}, { timeStamps: true })

userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(this.password, password)
}

module.exports = mongoose.model("User", userSchema)