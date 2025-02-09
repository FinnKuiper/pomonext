import NavBar from "@/components/app/NavBar";
import connectDB from "@/lib/mongoose";
import React from "react";

export default async function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await connectDB();
  return (
    <>
      <main className="p-4 h-full">{children}</main>
      <NavBar />
    </>
  );
}
