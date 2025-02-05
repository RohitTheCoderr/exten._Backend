import express from "express";
import {userRoute} from "./userRoutes/userRoute.js";

const router = express.Router();

///////////////// for user routes  /////////////////
router.use("/user", userRoute);

export const mainRoute = router;
