import express from "express";
const resumeRoute = express.Router();
import { checkAuthenticationCookie } from "../middleware/authenticate.middleware.js";
import {upload} from "../middleware/multer.middleware.js"
import {uploadResume} from "../controllers/resume.controller.js"
resumeRoute.post("/resume_upload",checkAuthenticationCookie("accessToken"),upload.single("resume_file"),uploadResume)

export default resumeRoute
