import { auth } from "@/auth";
import NavBar from "@/components/app/NavBar";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    // if no session exists, redirect to the login page
    if (!session) {
        redirect("/");
        return null;
    }
    return (
        <>
            <main className="p-4">{children}</main>
            <NavBar />
        </>
    );
}
