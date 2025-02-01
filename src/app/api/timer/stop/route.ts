import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";

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
    await activeSession.deleteOne();
    return NextResponse.json({ message: "Session stopped" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
