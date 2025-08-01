import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log('File is uploaded on cloudinary', response.url);

        // Cleanup after success
        fs.unlinkSync(localFilePath); 

        return response;
    } 
    catch (error) {
        console.error("Cloudinary upload error:", error);
        
        // Remove the locally saved temp file as the upload operation failed
        // Check if file exists before trying to delete it
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return null;
    }
};

export { uploadOnCloudinary };