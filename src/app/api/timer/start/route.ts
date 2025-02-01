import connectDB from "@/lib/mongoose";

export async function POST() {
    try {
        await connectDB();

        
    } catch (error) {
        console.error(error);
        return { status: 500, body: "Internal server error" };
    }
}
