import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    location: { type: String, required: true },

    current_job_title: { type: String },
    experience: { type: Number, default: 0 },
    skills: { type: [String], required: true },
    industry: { type: String, required: true },
    preferred_role: { type: String },

    education: { type: String, required: true },
    university: { type: String, required: true },
    graduation_year: { type: Number, required: true },

    expected_salary: { type: Number },
    preferred_location: { type: String },
    availability: { type: String },

    resume_file: { type: String, required: true }, // Store file path or URL
}, { timestamps: true });

export  const Resume =  mongoose.model("Resume", ResumeSchema);
