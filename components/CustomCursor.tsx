"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { SelectionFrame } from "@/components/SelectionFrame";

const DOT_SIZE = 16;
const EXPAND_SIZE = 350;
const EXPAND_TRANSITION_MS = 400;

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const expandRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      setEnabled(desktop.matches && !reducedMotion.matches);
    };

    syncEnabled();
    desktop.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);

    return () => {
      desktop.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const fill = fillRef.current;
    const expand = expandRef.current;
    if (!root || !dot || !fill || !expand) return;

    document.documentElement.classList.add("custom-cursor-enabled");
    document.body.classList.add("custom-cursor-enabled");

    let isExpand = false;
    let isActive = false;
    let hideTimeout = 0;

    const quickDotX = gsap.quickTo(dot, "left", { duration: 0.35, ease: "power3.out" });
    const quickDotY = gsap.quickTo(dot, "top", { duration: 0.35, ease: "power3.out" });

    const positionExpandLayers = (x: number, y: number) => {
      const half = EXPAND_SIZE / 2;
      gsap.set([fill, expand], { left: x - half, top: y - half });
    };

    const parkExpandLayers = () => {
      gsap.set([fill, expand], { left: -500, top: -500 });
    };

    const clearHideTimeout = () => {
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
        hideTimeout = 0;
      }
    };

    const collapseExpand = (x: number, y: number) => {
      clearHideTimeout();
      positionExpandLayers(x, y);
      root.classList.remove("is-expand");
      hideTimeout = window.setTimeout(() => {
        parkExpandLayers();
        hideTimeout = 0;
      }, EXPAND_TRANSITION_MS);
    };

    const openExpand = (x: number, y: number) => {
      clearHideTimeout();
      positionExpandLayers(x, y);
      root.classList.remove("is-expand");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.add("is-expand");
        });
      });
    };

    gsap.set(dot, { left: -40, top: -40 });
    parkExpandLayers();

    const setMode = (element: Element | null, x: number, y: number) => {
      const nextExpand = Boolean(element?.closest(".hero-name, .mascot-shell"));
      const active = Boolean(element?.closest("[data-cursor]"));
      const nextActive = active && !nextExpand;

      if (nextExpand !== isExpand) {
        isExpand = nextExpand;
        if (nextExpand) {
          openExpand(x, y);
        } else {
          collapseExpand(x, y);
        }
      }

      if (nextActive !== isActive) {
        isActive = nextActive;
        root.classList.toggle("is-active", nextActive);
      }
    };

    const move = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const hovered = document.elementFromPoint(x, y);

      setMode(hovered instanceof Element ? hovered : null, x, y);

      const dotHalf = DOT_SIZE / 2;
      quickDotX(x - dotHalf);
      quickDotY(y - dotHalf);

      if (isExpand) {
        positionExpandLayers(x, y);
      }
    };

    const leave = () => {
      clearHideTimeout();
      isExpand = false;
      isActive = false;
      root.classList.remove("is-expand", "is-active");
      gsap.set(dot, { left: -40, top: -40 });
      parkExpandLayers();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);

    return () => {
      clearHideTimeout();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([dot, fill, expand]);
      document.documentElement.classList.remove("custom-cursor-enabled");
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <div ref={rootRef} className="custom-cursor-root">
      <span ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <span ref={fillRef} className="cursor-invert-fill" aria-hidden="true" />
      <div ref={expandRef} className="cursor-expand-shell" aria-hidden="true">
        <div className="custom-cursor">
          <SelectionFrame color="var(--ink)" />
          <span className="cursor-you-label">You</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
