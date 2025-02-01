"use client";
import { HouseIcon, PersonStandingIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [page, setPage] = useState("home");

    const selectedStyle = "rounded-full bg-black text-white p-3";
    const unselectedStyle = "p-3";
    // get the current route
    const pathName = usePathname();
    // set the current page based on the route
    useEffect(() => {
        if (pathName === "/dashboard") {
            setPage("home");
        } else if (pathName === "/timer") {
            setPage("timer");
        } else if (pathName === "/profile") {
            setPage("profile");
        }
    }, [pathName]);
    return (
        <nav className="fixed bottom-0 w-full p-4 px-8 border-t">
            <div className="flex justify-between align-middle">
                <Link
                    className={
                        page === "home" ? selectedStyle : unselectedStyle
                    }
                    href="/dashboard"
                >
                    <HouseIcon />
                </Link>
                <Link
                    className={
                        page === "timer" ? selectedStyle : unselectedStyle
                    }
                    href="/timer"
                >
                    <TimerIcon />
                </Link>
                <Link
                    className={
                        page === "profile" ? selectedStyle : unselectedStyle
                    }
                    href="/profile"
                >
                    <PersonStandingIcon />
                </Link>
            </div>
        </nav>
    );
}
