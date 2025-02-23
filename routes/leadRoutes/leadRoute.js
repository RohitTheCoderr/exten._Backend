import express from "express";
import { getLeads } from "./leadAllRoute/getLeads.js";
import { createLeads } from "./leadAllRoute/createLeads.js";
import { deleteLead } from "./leadAllRoute/deleteLead.js";
import { updateLead } from "./leadAllRoute/updateLead.js";
import { getAllusersLeads } from "./leadAllRoute/getAllLeads.js";

// router
const router = express.Router();

// Lead Management Routes
router.use("/getsAll_leads", getAllusersLeads);        
router.use("/gets_leads", getLeads);        
router.use("/create_leads", createLeads);          
router.use("/delete_leads", deleteLead);   
router.use("/update_leads", updateLead);   




export const leadRoute = router;
