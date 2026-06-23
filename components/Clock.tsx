"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date) {
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })
    .replace(/\s/g, " ");
}

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatClock(new Date()));
    const interval = window.setInterval(() => {
      setTime(formatClock(new Date()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return <div className="clock">{time || "\u00a0"}</div>;
}
