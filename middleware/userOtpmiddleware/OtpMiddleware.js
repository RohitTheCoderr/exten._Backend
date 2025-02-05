import otpModel from "../../models/userModels/otpModel.js";
import { sendOtp } from "../../services/library/otpless.js";
import sendOTPOnEmail from "../../services/library/mailOTP.js";
import logger from "../../logger.js";

const sendOtpMiddleware = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

 console.log("heloo rohit phoneuber");
 
 if (!email && !phoneNumber) {
   return res.status(400).json({ message: "Email or phone number is required." });
  }
  
  let mailOtp, result;
  
  if (email) {
    mailOtp = Math.floor(1000 + Math.random() * 9000);
    result = await sendOTPOnEmail({
      to: email,
      subject: "Verify Your Email Account",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>User OTP Verification</h2>
      <p>Your OTP for verification: <strong>${mailOtp}</strong></p>
      <p>Valid for 10 minutes.</p>
      </div>
      `,
    });
  }
  
  console.log("heloo phoneuber");

    if (phoneNumber) {
      result = await sendOtp(phoneNumber, "WHATSAPP");
    }

    if (result?.success) {
      logger.info("OTP sent successfully...");

      if (mailOtp && email) {
        let expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await otpModel.findOneAndUpdate(
          { email },
          { mailOtp, expiresAt },
          { upsert: true }
        );
      }

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        otpID: result?.message?.startsWith("Otp") ? result?.message : null,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result?.message || "Error sending OTP",
      });
    }
  } catch (error) {
    logger.error(`Error sending OTP: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

export default sendOtpMiddleware;




// import { generateOtp, sendOtpToUser } from "../../../services/otpService.js";
// import logger from "../../logger.js";
// import otpModel from "../../models/userModels/otpModel.js";
// import { sendOTPOnEmail } from "../../services/library/mailOTP.js";
// import { sendOtp } from "../../services/library/otpless.js";

// export const sendOtpMiddleware = async (req, res) => {
//   try {
//     const { email, phoneNumber } = req.body;

//     // Validate input
//     if (!email && !phoneNumber) {
//       return res
//         .status(400)
//         .json({ message: "Email or phone number is required." });
//     }

//     let result, mailOtp;

//     if (email) {
//       mailOtp = Math.floor(1000 + Math.random() * 9000);
//       result = await sendOTPOnEmail({
//         to: email,
//         subject: "verify your email account",
//         html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//       <h2>User OTP Verification</h2>
//       <p>Dear user,</p>
//       <p>Your OTP for verification : <strong>${mailOtp}</strong></p>
//       <p>Please enter this code on the website to proceed. This OTP is valid for the next 10 minutes.</p>
//       <p>If you did not request this, please ignore this message or contact our support team immediately.</p>
//       <p>Thank you for choosing User!</p>
//      </div>
//         `,
//       });
//     }

//     if (phoneNumber) {
//       result = await sendOtp(phoneNumber, "WHATSAPP");
//       // result = await sendOtp(phoneNumber, "SMS")
//     }

//     if (result?.success) {
//       logger.info("OTP send successful...");
//       const otpID = result?.message?.startsWith("Otp") ? result?.message
//         : false;
//       if (mailOtp && email) {
//         let expiresAt = new Date();
//         expiresAt.setMinutes(expiresAt.getMinutes() + 10);

//         if (await otpModel.findOne({ email })) {
//           await otpModel.findOneAndUpdate({ email }, { mailOtp, expiresAt });
//         } else {
//           await otpModel.create({ email, mailOtp, expiresAt });
//         }
//       }

//       return res
//         .status(200)
//         .json({
//           success: true,
//           message: "OTP sent successfully",
//           data: { otpID },
//         });
//     } else
//       return res
//         .status(500)
//         .json({
//           success: false,
//           message: "Error sending OTP",
//           error: error.message,
//         });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error sending OTP", error: error.message });
//   }
// };
