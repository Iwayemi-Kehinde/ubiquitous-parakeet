const User = require("../models/User")
const crypto = require("crypto")

// GET /me
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// PUT /me
exports.updateMe = async (req, res, next) => {
    try {
        const { email, name } = req.body
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { email, name }, { new: true, runValidators: true })
        res.status(200).json({ message: "User profile updated Successfully", updatedUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// PUT /me/password

exports.updatePassword = async (req, res, next) => {
    try {
        const { newPassword, oldPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old and new passwords are required" });
        }

        const user = await User.findById(req.user.id).select("+password")
        if (!user) return res.status(404).json({ message: "user not found" })
        const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isOldPasswordMatch) return res.status(403).json({ message: "Incorrect old password" })
        user.password = newPassword

        await user.save();
        res.status(200).json({ message: "Password updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//PUT /me/addresses

exports.updateAddresses = async (req, res, next) => {
    try {
        const { addresses } = req.body;
        await User.findByIdAndUpdate(
            req.user.id,
            { addresses },
            { new: true }
        );
        res.json({ message: "Address Updated Succcessfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// /POST /forgot-password

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "user not found" })

        const token = crypto.randomBytes(32).toString('hex')
        const hashed = crypto.createHash('sha256').update(token).digest('hex');

        user.resetPasswordToken = hashed
        user.resetPasswordExpires = Date.now() + 3600000

        await user.save()

        console.log(`Reset link: http://localhost:5000/reset-password/${token}`);

        res.json({ message: 'Password reset link sent to email' });

    } catch (error) {
        res.status(500).json({ message: 'Error occures in the reset passwor section' })
    }
}


// POST /reset-password/:token

exports.resetPassword = async (req, res) => {
    const hashed = crypto.createHash('sha256').update(req.params.token).digest('hex');
  
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  
    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    res.json({ message: 'Password has been reset' });
  };
