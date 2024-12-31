// const bcrypt = require("bcrypt");
// const { sendEmail } = require("../../middleware/sendEmail");
// const crypto = require("crypto");
// const userModel = require("../../models/userModel");

// const forgotPassword = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "Email not found.",
//       });
//     }

//     const resetPasswordToken = user.getResetPasswordToken();
//     console.log(user.resetPasswordToken, user.resetPasswordExpire);

//     await user.save();

//     // Assuming you have a configuration variable for the frontend URL
//     const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
//     const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;

//     const message = `Dear ${user.name},
    
//   Please reset your password by clicking on the link below:
  
//   ${resetUrl}
  
//   If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.
  
//   Best regards,
//   Shopsmart
//   `;

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: "Password Reset Request - ShopSmart",
//         message,
//       });

//       res.status(200).json({
//         success: true,
//         message: `Email sent to ${user.email}`,
//       });
//     } catch (error) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save();

//       res.json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const resetPassword = async (req, res) => {
//   console.log(req.params.token);
//   try {
//     const resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     console.log(resetPasswordToken);

//     const user = await userModel.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is invalid or has expired",
//       });
//     }

//     const randomSalt = await bcrypt.genSalt(10);
//     const encryptedPassword = await bcrypt.hash(req.body.password, randomSalt);
//     user.password = encryptedPassword;

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Password Updated",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   forgotPassword,
//   resetPassword,
// };
