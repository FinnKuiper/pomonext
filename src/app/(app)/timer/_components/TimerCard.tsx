"use client";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function TimerCard() {
  const router = useRouter();
  const time = new Date();
  const [started, setStarted] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const expiryTimestamp = new Date(time.setSeconds(time.getSeconds() + 1500)); // 10 seconds timer
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => {
        handleStop();
      },
      autoStart: false,
    });

  // on first page load check current_timer route to see if there is an active session
  useEffect(() => {
    const fetchCurrentTimer = async () => {
      const res = await fetch("/api/timer/current_timer");
      if (res.ok) {
        const data = await res.json();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = minutes + ":" + seconds;
  }, [minutes, seconds]);

  const handleStop = () => {
    if (onBreak) {
      setOnBreak(false);
      return restart(expiryTimestamp, false);
    }
    fetch("/api/timer/stop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok || res.status === 401) {
        console.log("Timer stopped");
        setStarted(false);
        // start 5 minutes break
        if (!onBreak) {
          setOnBreak(true);
          console.log("Break started");
          restart(new Date(new Date().getTime() + 60000 * 5), false);
        }
        router.refresh();
      }
    });
  };

  const handleStart = () => {
    if (onBreak) {
      setStarted(true);
      start();
      return;
    }
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
      return (
        <Button onClick={handleStart} className="w-full">
          Start
        </Button>
      );
    } else {
      if (isRunning) {
        return (
          <Button onClick={onBreak ? pause : handlePauze} className="w-full">
            Pause
          </Button>
        );
      } else {
        return (
          <Button onClick={onBreak ? resume : handleResume} className="w-full">
            Resume
          </Button>
        );
      }
    }
  };
  return (
    <Card
      className={`w-full ${
        isRunning ? "bg-red-400 text-white" : ""
      } transition-colors max-w-lg`}
    >
      <CardHeader className="sm:p-8">
        <CardTitle>{onBreak ? "Break" : "Pomodoro"}</CardTitle>
      </CardHeader>
      <CardContent className="sm:p-8">
        <h2 className="scroll-m-20 text-7xl font-semibold tracking-tight first:mt-0 text-center">
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </h2>
      </CardContent>
      <CardFooter className="sm:p-8">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {timerButtons()}
          <Button variant="secondary" onClick={handleStop} className="w-full">
            quit early
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
