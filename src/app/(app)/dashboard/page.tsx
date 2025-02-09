import { auth } from "@/auth";
import HomePomoCard from "@/app/(app)/dashboard/_components/HomePomoCard";
import React from "react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="w-full flex flex-col gap-4 md:pt-20">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hello {session?.user?.name}
      </h1>
      <HomePomoCard />
    </div>
  );
}
