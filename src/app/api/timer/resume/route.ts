import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";

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
    // check if the session is not paused
    console.log(activeSession.paused);
    if (!activeSession.paused) {
      return NextResponse.json(
        { error: "Session is not paused" },
        { status: 400 }
      );
    }

    // resume the session

    activeSession.paused = false;
    activeSession.endAt = new Date(
      activeSession.endAt.getTime() +
        new Date().getTime() -
        activeSession.pausedAt.getTime()
    );
    await activeSession.save();
    return NextResponse.json({ message: "Timer resumed" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
