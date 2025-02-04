import { generateOtp, sendOtpToUser } from "../../../services/otpService.js";

export const sendOtpMiddleware = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // Validate input
    if (!email && !phoneNumber) {
      return res.status(400).json({ message: "Email or phone number is required." });
    }

    // Generate a random OTP
    const otp = generateOtp();

    // Save the OTP in memory, cache, or database (for demonstration, skipping database)
    req.session = { otp }; // Example if using express-session

    // Send OTP to email or phone
    if (email) {
      await sendOtpToUser(email, otp, "email");
    } else {
      await sendOtpToUser(phoneNumber, otp, "phone");
    }

    return res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    return res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};
