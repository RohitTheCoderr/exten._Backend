import logger from "../../logger.js";
import UserModel from "../../models/userModels/userSchema.js";

const checkAccountExist = async (req, res, next) => {
  try {
    logger.info("rohit data holl",req.body.phoneNumber);
    const { email, phoneNumber } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    });

    if (user) {
      return res.status(409).json({ message: "Account already exists." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default checkAccountExist;
