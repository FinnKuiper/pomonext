import { Schema, model, models } from "mongoose";

export interface PomoSessionDocument {
  _id: string;
  userId: string;
  startAt: Date;
  endAt: Date;
  paused: boolean;
  pausedAt?: Date;
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
    startAt: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endAt: {
      type: Date,
    },
    paused: {
      type: Boolean,
      default: false,
    },
    pausedAt: {
      type: Date,
      required: false,
      default: null,
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

export default models.PomoSession || model("PomoSession", pomoSessionSchema);
