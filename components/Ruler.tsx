import { Clock } from "@/components/Clock";
import type { CSSProperties } from "react";

const ticks = Array.from({ length: 20 }, (_, index) => index * 100);

export function Ruler() {
  return (
    <div className="ruler" aria-hidden="true">
      <div className="ruler-track">
        {ticks.map((tick) => (
          <span key={tick} className="ruler-tick" style={{ "--tick": `${tick}px` } as CSSProperties}>
            <i />
            <em>{tick}</em>
          </span>
        ))}
      </div>
      <Clock />
    </div>
  );
}
