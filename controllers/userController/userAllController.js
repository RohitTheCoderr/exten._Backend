import logger from "../../logger.js";
import UserModel from "../../models/userModels/userSchema.js"
import { createHashedPassword } from "../../services/library/bcrypt.js";
import { SendOtpValidator, signUpValidator } from "../../schema_validation/userData/login_signupvalidate.js";
import { StatusCodes } from "http-status-codes";

export const checkAccountExist = async (req, res, next) => {
  try {
    console.log("equest body for valida", req.body );
    
    // logger.info("Request body for validation", { body: req.body }); // Log incoming request body
    const { phoneNumber, email } = await SendOtpValidator.validateAsync(req.body);
   console.log("hone Number:", phoneNumber);
   
    let user;
    if (phoneNumber) {
      user = await UserModel.findOne({ phoneNumber });
    } else if (email) {
      user = await UserModel.findOne({ email });
    }

    if (req?.baseUrl == "/api/users/user/send_signup_otp" || req?.baseUrl == "/api/users/user/send_phone_or_email_otp") {
      if (user) {
        console.log("user exits");
        
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "user already exist.", data: {} });
      } else {
        
        console.log("next fun call");
        return next();
      }
    } else if (req?.baseUrl == "/api/users/user/send_forgot_password_otp") {
      if (user) {
        logger.info(`check user ${user}`);
        return next();
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "user not exist.", data: {} });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Send_forgot_password_otp Or send_signup_otp Or /send_forgot_password_otp is only allowed route for send otp", data: {} });
    }

  } catch (error) {
    logger.error(`exception occurred at checkAccountExist : ${JSON.stringify(error)}`);
    next(error);
  }
};

export const signUpController=async(req,res,next)=>{
  try {
    let userData = await signUpValidator.validateAsync(req.body);

    logger.info(`signUp data ${JSON.stringify(userData)}`);


    let user;

    if (userData?.phoneNumber) {
      user = await UserModel.findOne({ phoneNumber: userData?.phoneNumber })
    }
    else if (userData?.email) {
      user = await UserModel.findOne({ email: userData?.email })
    }

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "user already exist." })
    }

    userData.password = await createHashedPassword(userData.password)
    const newUser = await UserModel.create(userData);
    logger.info(`user created ${newUser}`)
    if (newUser._id) {
      req.userId = newUser._id;
      return next()
    }
    else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: "user not created" })
    }
  } catch (error) {
    logger.error(`exception occurred at signUpController : ${JSON.stringify(error)}`);
    return next(error);
  }
}




// export default checkAccountExist;
