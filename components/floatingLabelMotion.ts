import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LOOP_EASE = "sine.inOut";
// Hover repel — tighter zone so labels don't drift too far from cursor.
const REPEL_THRESHOLD = 140;
const REPEL_DURATION = 0.45;
const REPEL_DISTANCE_SMOOTH = 0.35;
const REPEL_STRENGTH = 0.55;

const LOOP_CONFIG = {
  product: {
    rotate: 6,
    x: 48,
    y: -36,
    duration: 2.5,
    baseRotate: 0
  },
  location: {
    rotate: 8,
    x: -24,
    y: -38,
    duration: 4,
    baseRotate: -8
  }
} as const;

type FloatingLabelVariant = keyof typeof LOOP_CONFIG;

function getVariant(root: HTMLElement): FloatingLabelVariant | null {
  const fromData = root.dataset.floatingLabel;
  if (fromData === "product" || fromData === "location") return fromData;
  if (root.classList.contains("product-label")) return "product";
  if (root.classList.contains("location-label")) return "location";
  return null;
}

function ensureMotionLayers(root: HTMLElement) {
  let loop = root.querySelector<HTMLElement>(".floating-label__loop");
  let hover = root.querySelector<HTMLElement>(".floating-label__hover");

  if (loop && hover) {
    return { loop, hover };
  }

  loop = document.createElement("div");
  loop.className = "floating-label__loop";
  hover = document.createElement("div");
  hover.className = "floating-label__hover";

  while (root.firstChild) {
    hover.appendChild(root.firstChild);
  }

  loop.appendChild(hover);
  root.appendChild(loop);

  return { loop, hover };
}

function getRepelOffset(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  smoothedDistance: number
): { x: number; y: number } {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  const distance = Math.hypot(dx, dy);

  if (distance >= REPEL_THRESHOLD && smoothedDistance >= REPEL_THRESHOLD) {
    return { x: 0, y: 0 };
  }

  const strength = Math.max(0, 1 - smoothedDistance / REPEL_THRESHOLD);

  // Framer Hover Force (direction: both, mode: repel):
  // offset = (mouse - center) * strength * -1
  // Near center → tiny shift, so the cursor can overlap the pill.
  return {
    x: -dx * strength * REPEL_STRENGTH,
    y: -dy * strength * REPEL_STRENGTH
  };
}

export function setupFloatingLabelAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopQuery = window.matchMedia("(min-width: 810px)");
  const labels = gsap.utils.toArray<HTMLElement>(".floating-label");

  const cleanups: Array<() => void> = [];

  labels.forEach((root) => {
    const variant = getVariant(root);
    if (!variant) return;

    const { loop, hover } = ensureMotionLayers(root);
    const config = LOOP_CONFIG[variant];
    let loopTween: gsap.core.Tween | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let quickX: gsap.QuickToFunc | null = null;
    let quickY: gsap.QuickToFunc | null = null;
    let quickDistance: gsap.QuickToFunc | null = null;
    const distanceState = { value: REPEL_THRESHOLD };
    let pointerX = 0;
    let pointerY = 0;

    gsap.set(loop, { rotate: config.baseRotate, x: 0, y: 0, force3D: true });
    gsap.set(hover, { x: 0, y: 0, force3D: true });

    const setupLoop = () => {
      loopTween?.kill();
      scrollTrigger?.kill();
      loopTween = null;
      scrollTrigger = null;

      if (reduceMotion || !desktopQuery.matches) {
        gsap.set(loop, { rotate: config.baseRotate, x: 0, y: 0 });
        return;
      }

      loopTween = gsap.fromTo(
        loop,
        { rotate: config.baseRotate, x: 0, y: 0 },
        {
          rotate: config.rotate,
          x: config.x,
          y: config.y,
          duration: config.duration,
          ease: LOOP_EASE,
          repeat: -1,
          yoyo: true,
          force3D: true
        }
      );

      const heroSection = root.closest(".hero-section");
      if (heroSection && loopTween) {
        scrollTrigger = ScrollTrigger.create({
          trigger: heroSection,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => loopTween?.play(),
          onEnterBack: () => loopTween?.play(),
          onLeave: () => loopTween?.pause(),
          onLeaveBack: () => loopTween?.pause()
        });
      }
    };

    const applyRepel = () => {
      if (!quickX || !quickY) return;
      const rect = loop.getBoundingClientRect();
      const { x, y } = getRepelOffset(
        pointerX,
        pointerY,
        rect,
        distanceState.value
      );
      quickX(x);
      quickY(y);
    };

    const setupHover = () => {
      quickX?.tween?.kill();
      quickY?.tween?.kill();
      quickDistance?.tween?.kill();
      quickX = null;
      quickY = null;
      quickDistance = null;
      distanceState.value = REPEL_THRESHOLD;
      gsap.set(hover, { x: 0, y: 0 });

      if (!desktopQuery.matches) return;

      quickX = gsap.quickTo(hover, "x", {
        duration: REPEL_DURATION,
        ease: "power3.out"
      });
      quickY = gsap.quickTo(hover, "y", {
        duration: REPEL_DURATION,
        ease: "power3.out"
      });
      quickDistance = gsap.quickTo(distanceState, "value", {
        duration: REPEL_DISTANCE_SMOOTH,
        ease: "power2.out",
        onUpdate: applyRepel
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!desktopQuery.matches || !quickX || !quickY || !quickDistance) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      const rect = loop.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(pointerX - centerX, pointerY - centerY);
      quickDistance(Math.min(distance, REPEL_THRESHOLD));
    };

    setupLoop();
    setupHover();

    const onDesktopChange = () => {
      setupLoop();
      setupHover();
    };

    desktopQuery.addEventListener("change", onDesktopChange);
    window.addEventListener("pointermove", onPointerMove);

    cleanups.push(() => {
      desktopQuery.removeEventListener("change", onDesktopChange);
      window.removeEventListener("pointermove", onPointerMove);
      scrollTrigger?.kill();
      loopTween?.kill();
      quickX?.tween?.kill();
      quickY?.tween?.kill();
      quickDistance?.tween?.kill();
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
