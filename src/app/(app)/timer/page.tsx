"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useState } from "react";

export default function TimerPage() {
  const time = new Date();
  const [started, setStarted] = useState(false);
  const expiryTimestamp = new Date(time.setSeconds(time.getSeconds() + 600)); // 10 seconds timer
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        fetch("/api/timer/stop", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }).then((res) => {
          if (res.ok) {
            console.log("Timer stopped");
          }
        });
      },
      autoStart: false,
    });

  // on first page load check current_timer route to see if there is an active session
  useEffect(() => {
    const fetchCurrentTimer = async () => {
      const res = await fetch("/api/timer/current_timer");
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const { endAt, pausedAt, paused } = data;
        if (paused) {
          const timeLeft =
            new Date(endAt).getTime() - new Date(pausedAt).getTime();
          restart(new Date(new Date().getTime() + timeLeft), false);
          setStarted(true);
        } else {
          restart(new Date(endAt));
          setStarted(true);
        }
      } else {
        console.log("No active session found");
      }
    };
    fetchCurrentTimer();
  }, []);
  const handleStart = () => {
    fetch("/api/timer/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        start();
        setStarted(true);
        console.log("Timer started");
      }
    });
  };

  const handlePauze = () => {
    fetch("/api/timer/pause", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        pause();
        console.log("Timer paused");
      }
    });
  };

  const handleResume = () => {
    fetch("/api/timer/resume", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        resume();
        console.log("Timer resumed");
      }
    });
  };

  const timerButtons = () => {
    if (!started) {
      return <Button onClick={handleStart}>Start</Button>;
    } else {
      if (isRunning) {
        return <Button onClick={handlePauze}>Pause</Button>;
      } else {
        return <Button onClick={handleResume}>Resume</Button>;
      }
    }
  };

  return (
    <div className="flex items-center justify-center flex-col space-y-4">
      <h1>Timer</h1>
      <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </h2>
      <div className="flex space-x-4">{timerButtons()}</div>
    </div>
  );
}
