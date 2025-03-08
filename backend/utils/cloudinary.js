import { v2 as cloudinary } from "cloudinary"; // Cloudinary for file uploads
import fs from "fs"; // File system module to handle file operations


// Configure Cloudinary with environment variables for security and flexibility
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Cloudinary cloud name from environment variables
  api_key: process.env.API_KEY,       // Cloudinary API key from environment variables
  api_secret: process.env.API_SECRET  // Cloudinary API secret from environment variables
});

// Function to upload a file to Cloudinary
const uploadFile = async (localStorage) => {
  try {
    // Check if local file path is provided
    if (!localStorage) {
      return "Please provide a valid local file path.";
    }

    // Upload the file to Cloudinary
    const uploaded = await cloudinary.uploader.upload(localStorage, {
      resource_type: "auto" // Automatically detects and sets the file type (image, video, etc.)
    });

    // Log the URL of the uploaded file
    console.log("Cloudinary upload successful. URL:", uploaded.url);

    // Delete the local file after successful upload
    fs.unlinkSync(localStorage);
    
    // Return the uploaded file details (including URL)
    return uploaded;
  } catch (error) {
    // Log the upload error
    console.error("Cloudinary upload error:", error);

    // Check if the local file exists, and if so, delete it
    if (fs.existsSync(localStorage)) {
      fs.unlinkSync(localStorage); // Delete the local file to free up storage
      console.log("Local file deleted due to upload error.");
    }

    // Return or rethrow the error for further handling
    throw new Error("File upload failed. Please try again.");
  }
};

// Export the uploadFile function for use in other modules
export { uploadFile };
