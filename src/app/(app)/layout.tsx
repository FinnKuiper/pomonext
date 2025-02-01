"use client";
import NavBar from "@/components/app/NavBar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <main className="p-4">{children}</main>
                <NavBar />
            </QueryClientProvider>
        </>
    );
}
