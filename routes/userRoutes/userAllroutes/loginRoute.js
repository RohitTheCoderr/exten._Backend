import express from "express";
import { generateToken } from "../../../middleware/jwtMiddle.js";

const router = express.Router();
router.route("/").post.post(loginController, generateToken)

// Export the router as a named export
export const loginRoute = router;