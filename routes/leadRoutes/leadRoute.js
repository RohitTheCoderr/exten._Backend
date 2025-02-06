import express from "express";
import { getLeads } from "./leadAllRoute/getLeads.js";
import { createLeads } from "./leadAllRoute/createLeads.js";
import { deleteLead } from "./leadAllRoute/deleteLead.js";

// router
const router = express.Router();

// Lead Management Routes
router.use("/gets_leads", getLeads);        
router.use("/create_leads", createLeads);          
router.use("/delete_leads", deleteLead);   




export const leadRoute = router;
