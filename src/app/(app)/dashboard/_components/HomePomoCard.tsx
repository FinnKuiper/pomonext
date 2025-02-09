import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { auth } from "@/auth";
import PomoStats from "@/models/PomoStats";
import Link from "next/link";

export default async function HomePomoCard() {
  const session = await auth();

  const pomoStats = await PomoStats.findOne({
    userId: session?.user?.id,
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  if (!pomoStats) {
    return (
      <Card className="w-full border-dashed">
        <CardHeader>
          <CardTitle>Start your first Pomo</CardTitle>
          <CardDescription>
            You haven&apos;t finished a pomo session today. Click the button
            below to get started!
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/timer">START!</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const calculateHours = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today&apos;s pomo</CardTitle>
        <CardDescription>your pomo stats today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Focus time
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {calculateHours(pomoStats.totalTimeWorked)}
            </p>
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Sessions
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {pomoStats.totalCompletedSessions}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/timer">Continue</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
