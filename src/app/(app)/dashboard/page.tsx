import { auth } from "@/auth";
import { SignOut } from "@/components/auth/SignOutButton";
import React from "react";

export default async function Dashboard() {
    const session = await auth();
    return (
        <div>
            <h1>Hello! {session?.user?.name}</h1>
            <SignOut />
        </div>
    );
}
