import mongoose from "mongoose";

const databaseURL: string = process.env.MONGODB_URI || "";

const connectDB = async () => {
    try {
        await mongoose.connect(databaseURL, {});
        console.log("MongoDB connected");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
};

export default connectDB;
