const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDB