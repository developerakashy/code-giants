import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {Resume} from "../model/resume.model.js"
import {uploadFile} from "../utils/cloudinary.js"
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Upload Resume Controller (Single Function)
const uploadResume = asyncHandler(async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        // Required fields validation
        const requiredFields = [
            "name", "email", "phone", "location",
            "industry", "skills", "education", "university", "graduation_year"
        ];

        // Check if any of the required fields is empty or missing
        const emptyField = requiredFields.some(field => !req.body[field] || req.body[field].trim() === "");
        if (emptyField) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Destructure fields from the request body
        const {
            name, email, phone, linkedin, github, portfolio, location,
            current_job_title, experience, skills, industry, preferred_role,
            education, university, graduation_year, expected_salary,
            preferred_location, availability
        } = req.body;

        const local_path=path.join(__dirname,`../public/temp/${req.file.filename}`);
        const upload=await uploadFile(local_path);

        // const resumeText = await extractResumeText(req.file.path);

        // const jobMatches = recommendJobs(resumeText);

        fs.unlinkSync(req.file.path);


let skillArray=skills.split(',').map(skill => skill.trim())
        const resumeData = await Resume.create({
            name,
            email,
            phone,
            linkedin,
            github,
            portfolio,
            location,
            current_job_title,
            experience,
            skills: skillArray, // Stored as array
            industry,
            preferred_role,
            education,
            university,
            graduation_year,
            expected_salary,
            preferred_location,
            availability,
            resume_file: upload.secure_url
        });

        // Send response with job recommendations and saved resume data
        res.json({
            message: "Resume uploaded successfully",
            // job_recommendations: jobMatches,
            resume: resumeData
        });

    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Internal Server Error" });

       throw new apiError(400, error?.message || 'something went while getting username')
    }
});


export  { uploadResume };
