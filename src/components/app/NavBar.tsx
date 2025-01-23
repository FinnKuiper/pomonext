import { HouseIcon, PersonStandingIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <nav className="fixed bottom-0 w-full p-4 px-8 border-t">
            <div className="flex justify-between align-middle">
                <Link className="" href="/dashboard">
                    <HouseIcon />
                </Link>
                <Link className="" href="/timer">
                    <TimerIcon />
                </Link>
                <Link className="" href="/profile">
                    <PersonStandingIcon />
                </Link>
            </div>
        </nav>
    );
}
