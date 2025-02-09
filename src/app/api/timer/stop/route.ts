import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";
import PomoStats from "@/models/PomoStats";

export async function DELETE() {
  try {
    await connectDB();
    const session = await auth();
    const activeSession = await PomoSession.findOne({
      userId: session?.user?.id,
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    if (!activeSession) {
      return NextResponse.json(
        { error: "No active session found" },
        { status: 404 }
      );
    }
    // check if the endTime is after the endAt time
    const currentTime = new Date();
    if (currentTime < activeSession.endAt) {
      await activeSession.deleteOne();
      return NextResponse.json(
        { error: "Session stopped before it's end time" },
        { status: 400 }
      );
    }

    await activeSession.deleteOne();
    const pomoStats = await PomoStats.findOne({
      userId: session?.user?.id,
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    if (pomoStats) {
      pomoStats.totalCompletedSessions += 1;
      pomoStats.totalTimeWorked += 25;
      await pomoStats.save();
    } else {
      await PomoStats.create({
        userId: session?.user?.id,
        totalCompletedSessions: 1,
        totalTimeWorked: 25,
      });
    }

    return NextResponse.json({ message: "Session stopped" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
