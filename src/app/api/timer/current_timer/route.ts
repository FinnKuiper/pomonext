import { auth } from "@/auth";
import connectDB from "@/lib/mongoose";
import PomoSession from "@/models/PomoSession";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const session = await auth();

    // find the active PomoSession
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

    return NextResponse.json(activeSession);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
