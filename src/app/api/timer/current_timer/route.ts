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
    });
    if (!activeSession) {
      return NextResponse.json(
        { error: "No active session found" },
        { status: 404 }
      );
    }

    // if the session is not from today delete it
    const today = new Date().toDateString();
    if (activeSession.createdAt.toDateString() !== today) {
      await PomoSession.findByIdAndDelete(activeSession._id);
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
