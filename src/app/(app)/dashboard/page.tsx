import { auth } from "@/auth";
import HomePomoCard from "@/components/app/HomePomoCard";
import React from "react";

export default async function Dashboard() {
    const session = await auth();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Hello {session?.user?.name}
            </h1>
            <HomePomoCard />
        </div>
    );
}
