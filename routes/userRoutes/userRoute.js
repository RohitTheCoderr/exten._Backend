import express from "express";
import {sendOptSignUp} from "./userAllroutes/sendOptSignUp.js";

// router
const router = express.Router();

// signup login
router.use("/send_signup_otp", sendOptSignUp);
// router.use("/signup", signUpRoute);

export const userRoute = router;







// import express from "express";
// import { sendSignUpOTPRoute } from "./userAllroutes/sendOptSignUp";

// // router
// const router = express.Router();
 
// // signup login 
// router.use("/send_signup_otp", sendSignUpOTPRoute)
// router.use("/signup", signUpRoute)
// // router.use("/login", loginRoute)

// // // user update
// // router.use("/send_phone_or_email_otp", sendUpdatePhoneOrEmailRoute)
// // router.use("/phone_or_email_update", updatePhoneOrEmailRoute)

// // // change password
// // router.use("/send_forgot_password_otp", sendForgetOTPRoute)
// // router.use("/change_password", passwordChangeRoute)

// export { router as userRoute };


