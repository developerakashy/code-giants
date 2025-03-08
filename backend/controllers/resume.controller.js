import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";




app.post("/upload-resume", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const resumeText = await extractTextFromPDF(req.file.path);
        const jobMatches = recommendJobs(resumeText);

        fs.unlinkSync(req.file.path); // Delete uploaded file after processing
        res.json({ job_recommendations: jobMatches });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const upload_resume=asyncHandler(async(req,res)=>{
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const resumeText = await extractTextFromPDF(req.file.path);
        const jobMatches = recommendJobs(resumeText);

        fs.unlinkSync(req.file.path); // Delete uploaded file after processing
        res.json({ job_recommendations: jobMatches });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})