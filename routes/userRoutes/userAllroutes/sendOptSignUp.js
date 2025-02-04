import { Router } from "express";
import { checkAccountExist } from "../../../controllers/userController/userAllController";
import { sendOtpMiddleware } from "../../../middleware/userOtpmiddleware/OtpMiddleware";
const router = Router()
router.route("/")
    .post(checkAccountExist, sendOtpMiddleware)

export {router as sendSignUpOTPRoute}
