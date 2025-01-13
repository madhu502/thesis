const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOtp = require("../../services/sendOTP.js");

const forgotPassword = async (req, res) => {
  console.log(req.body);
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Provide your Phone number",
    });
  }
  try {
    //finding user
    const user = await userModel.findOne({ phone: phone });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // generate random 6 digit  OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // generate expiry date
    const expiryDate = Date.now() + 360000;

    // save to database for verification
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = expiryDate;
    await user.save();

    // send to register phone number
    const isSent = await sendOtp(phone, otp);
    if (!isSent) {
      return res.status(400).json({
        success: false,
        message: "Error sending otp code!",
      });
    }
    // if success
    res.status(200).json({
      success: true,
      message: "OTP SEnd Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// verify otp ans set new password
const verifyOtpAndSetPassword = async (req, res) => {
  //get data
  const { phone, otp, newPassword } = req.body;
  if (!phone || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
  }
  try {
    const user = await userModel.findOne({ phone: phone });

    // verify otp
    if (user.resetPasswordOTP != otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired !",
      });
    }
    // password hash
    // Hashing /Encryption of the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, randomSalt);

    //update to database
    user.password = hashedPassword;
    await user.save();

    // response
    return res.status(200).json({
      success: true,
      message: " OTP varified and Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
};

module.exports = {
  forgotPassword,
  verifyOtpAndSetPassword,
};
