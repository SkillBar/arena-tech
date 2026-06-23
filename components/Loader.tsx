"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDone(true), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`loader ${done ? "is-done" : ""}`} aria-hidden={done}>
      <div className="loader-pill">Hey there!</div>
      <span className="loader-hidden">Welcome!</span>
    </div>
  );
}
