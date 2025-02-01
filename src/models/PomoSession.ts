import { Schema, model } from "mongoose";

export interface PomoSessionDocument {
    _id: string;
    userId: string;
    taskId: string;
    startAt: Date;
    paused: boolean;
    pausedAt?: Date;
    endAt: Date;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

const pomoSessionSchema = new Schema<PomoSessionDocument>(
    {
        userId: {
            type: String,
            required: [true, "User ID is required"],
        },
        taskId: {
            type: String,
            required: [true, "Task ID is required"],
        },
        startAt: {
            type: Date,
            required: [true, "Start time is required"],
        },
        paused: {
            type: Boolean,
            default: false,
        },
        endAt: {
            type: Date,
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        },
    },
    {
        timestamps: true,
    }
);

const PomoSession = model<PomoSessionDocument>(
    "PomoSession",
    pomoSessionSchema
);
export default PomoSession;
