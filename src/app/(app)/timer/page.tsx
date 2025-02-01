"use client";
import { Button } from "@/components/ui/button";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState, useRef, useEffect } from "react";

export default function TimerPage() {
    

    const [time, setTime] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleStart = () => {
        
        if (time === 0) return;
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
        setIsActive(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTime((time) => {
                    if (time === 0) {
                        setIsActive(false);
                        return 10;
                    }
                    return time - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, isPaused]);

    return (
        <div className="flex items-center justify-center flex-col space-y-4">
            <h1>Timer</h1>
            <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0">
                {time < 10 ? `0${time}` : time}
            </h2>
            <div className="flex space-x-4">
                <Button onClick={handleStart}>Start</Button>
                <Button onClick={handlePause}>Pause</Button>
            </div>
        </div>
    );
}
