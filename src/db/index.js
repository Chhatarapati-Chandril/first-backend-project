import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Debug: Check if environment variable is loaded
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        console.log("Attempting to connect to MongoDB...");
        console.log("MongoDB URI:", process.env.MONGODB_URI.replace(/\/\/.*:.*@/, "//***:***@")); // Hide credentials
        
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } 
    catch (error) {
        console.log("MongoDB connection FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;