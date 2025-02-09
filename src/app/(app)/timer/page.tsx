import React from "react";
import Head from "next/head";
import TimerCard from "./_components/TimerCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timer",
  description: "Timer page",
};

export default function TimerPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Head>
        <title>Timer</title>
      </Head>
      <TimerCard />
    </div>
  );
}
