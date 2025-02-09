import { Schema, model, models } from "mongoose";

export interface PomoStatsDocument {
  _id: string;
  userId: string;
  totalCompletedSessions: number;
  totalTimeWorked: number;
  createdAt: Date;
  updatedAt: Date;
}

const pomoStatsSchema = new Schema<PomoStatsDocument>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    totalCompletedSessions: {
      type: Number,
      default: 0,
    },
    totalTimeWorked: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default models.PomoStats || model("PomoStats", pomoStatsSchema);
