import express from "express";
import { getAllLeads } from "../../../controllers/leadController/leadAllController.js";
// import { getAllLeads } from "../../../controllers/leadController/leadAllController";
// import { verifyToken } from "../../../middleware/jwtMiddle.js";
// import { getMyLeads } from "../../../controllers/leadController/leadAllController.js";

const router = express.Router();
router.route("/").get(getAllLeads)

export const getAllusersLeads = router;