import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();
    const session = await auth();

    // Check for active PomoSession that was created today
    const activeSession = await PomoSession.findOne({
      userId: session?.user?.id,
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    if (activeSession) {
      return NextResponse.json(
        { error: "You already have an active session" },
        { status: 400 }
      );
    }

    const currentDate = new Date();

    // Create new PomoSession
    const newSession = new PomoSession({
      userId: session?.user?.id,
      startAt: currentDate,
      endAt: new Date(currentDate.getTime() + 60 * 10 * 1000), // 10 minutes
      duration: 60 * 10 * 1000, // 10 minutes
      paused: false,
    });
    console.log(newSession);
    await newSession.save();
    return NextResponse.json({ message: "Timer started" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
