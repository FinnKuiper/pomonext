import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function Profile() {
    const session = await auth();
    return (
        <div className="flex items-center justify-center flex-col space-y-4">
            <Image
                src={session?.user?.image ?? "/default-profile-pic.jpg"}
                width={64}
                height={64}
                alt="profile pic"
                className="rounded-full"
            />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {session?.user?.name}
            </h1>
            <small className="text-sm font-medium leading-none">
                {session?.user?.email}
            </small>
            <Button>Edit profile</Button>
            <SignOutButton />
            <Button variant="outline" className="w-full">
                Delete account
            </Button>
        </div>
    );
}
