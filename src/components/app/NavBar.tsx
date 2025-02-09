"use client";
import { HouseIcon, PersonStandingIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [page, setPage] = useState("home");

  const unselectedStyle = "p-3 flex items-center justify-center gap-2";
  const selectedStyle =
    unselectedStyle + " rounded-full md:rounded-md bg-black text-white";
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
    <nav className="fixed bottom-0 md:bottom-auto md:top-0 w-full p-4 px-8 xl:px-96 border-t md:border-b bg-white ">
      <div className="flex justify-between align-middle">
        <Link
          className={page === "home" ? selectedStyle : unselectedStyle}
          href="/dashboard"
        >
          <p className="hidden md:block">Home</p>
          <HouseIcon />
        </Link>
        <Link
          className={page === "timer" ? selectedStyle : unselectedStyle}
          href="/timer"
        >
          <p className="hidden md:block">Timer</p>
          <TimerIcon />
        </Link>
        <Link
          className={page === "profile" ? selectedStyle : unselectedStyle}
          href="/profile"
        >
          <p className="hidden md:block">Profile</p>
          <PersonStandingIcon />
        </Link>
      </div>
    </nav>
  );
}
