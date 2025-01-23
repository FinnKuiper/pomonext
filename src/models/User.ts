import { Schema, model } from "mongoose";

export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Email is invalid",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
    },
    {
        timestamps: true,
    }
);

const User = model<UserDocument>("User", userSchema);
export default User;
