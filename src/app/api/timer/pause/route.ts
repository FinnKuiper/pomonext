import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";
import { NextResponse } from "next/server";

export async function PUT() {
  try {
    await connectDB();
    const session = await auth();

    // Find the active PomoSession
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
    // Check if the session is already paused
    if (activeSession.paused) {
      return NextResponse.json(
        { error: "Session is already paused" },
        { status: 400 }
      );
    }

    // Pause the session
    activeSession.paused = true;
    activeSession.pausedAt = new Date();
    await activeSession.save();
    return NextResponse.json({ message: "Timer paused" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
