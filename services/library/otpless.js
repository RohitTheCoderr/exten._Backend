// In otpless.js, change the export to a named export
import logger from "../../logger.js";
import otppless from "otpless-node-js-auth-sdk";

const { sendOTP, verifyOTP } = otppless;

const clientId = process.env.OTPLESS_CLIENT_ID || "";
const secretId = process.env.OTPLESS_CLIENT_SECRET || "";
const otpExpiryTime = process.env.OTPLESS_EXPIRY_TIME || "";
const otpLength = process.env.OTPLESS_LENGTH || "";

export async function sendOtp(phoneNumber, channel) {
  try {
    if (!clientId || !secretId || !otpExpiryTime || !otpLength) {
      logger.info(
        "OTPLESS_CLIENT_ID OR OTPLESS_CLIENT_SECRET OR OTPLESS_EXPIRY_TIME OR OTPLESS_LENGTH may not be in .env",
        { __filename }
      );
    }

    const otpResponse = await sendOTP(
      phoneNumber,
      null,
      channel,
      null,
      null,
      Number(otpExpiryTime),
      otpLength,
      clientId,
      secretId
    );

    if (otpResponse && otpResponse.hasOwnProperty("success") && !otpResponse.success) {
      return {
        success: false,
        message: "Server Error",
      };
    }

    return {
      success: true,
      message: otpResponse.orderId,
    };
  } catch (err) {
    logger.error("Error while sending OTP", { __filename });
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function verifyOtp(phoneNumber, uniqueId, otp) {
  logger.info("Verify OTP method starts", { __filename });

  try {
    if (!clientId || !secretId || !otpExpiryTime || !otpLength) {
      logger.info(
        "OTPLESS_CLIENT_ID OR OTPLESS_CLIENT_SECRET OR OTPLESS_EXPIRY_TIME OR OTPLESS_LENGTH may not be in .env",
        { __filename }
      );
    }

    const isValidOTP = await verifyOTP(
      null,
      phoneNumber,
      uniqueId,
      otp,
      clientId,
      secretId
    );

    if (isValidOTP && Object.keys(isValidOTP).length) {
      if (!isValidOTP.isOTPVerified) {
        logger.error("Invalid OTP", { __filename });
        return {
          success: false,
          message: "Invalid OTP",
        };
      }
    }

    return {
      success: true,
      message: "OTP verified",
    };
  } catch (err) {
    logger.error("Error while verifying OTP", { __filename });
    return {
      success: false,
      message: err.message,
    };
  }
}
