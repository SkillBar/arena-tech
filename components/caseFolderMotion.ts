import gsap from "gsap";

const HOVER_SCALE = 1.1;
const PARALLAX_X = 24;
const PARALLAX_Y = 18;
const MOTION_DURATION = 0.55;

export function setupCaseFolderHoverAnimations() {
  const links = gsap.utils.toArray<HTMLElement>(".case-folder-link");
  if (!links.length) return undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopQuery = window.matchMedia("(min-width: 810px) and (hover: hover)");
  const cleanups: Array<() => void> = [];

  if (reducedMotion) return undefined;

  links.forEach((link) => {
    const image = link.querySelector<HTMLElement>(".case-folder-image");
    const inner = link.querySelector<HTMLElement>(".case-folder-image-inner");
    if (!image || !inner) return;

    gsap.set(inner, { transformOrigin: "center center", force3D: true });

    let quickX: gsap.QuickToFunc | null = null;
    let quickY: gsap.QuickToFunc | null = null;
    let hovered = false;

    const setupQuickTo = () => {
      quickX?.tween?.kill();
      quickY?.tween?.kill();

      if (!desktopQuery.matches) {
        quickX = null;
        quickY = null;
        gsap.set(inner, { x: 0, y: 0, scale: 1 });
        return;
      }

      quickX = gsap.quickTo(inner, "x", {
        duration: MOTION_DURATION,
        ease: "power3.out"
      });
      quickY = gsap.quickTo(inner, "y", {
        duration: MOTION_DURATION,
        ease: "power3.out"
      });
    };

    const onEnter = () => {
      if (!desktopQuery.matches) return;
      hovered = true;
      gsap.to(inner, {
        scale: HOVER_SCALE,
        duration: MOTION_DURATION,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    const onLeave = () => {
      hovered = false;
      gsap.to(inner, {
        x: 0,
        y: 0,
        scale: 1,
        duration: MOTION_DURATION,
        ease: "power3.out",
        overwrite: "auto"
      });
    };

    const onMove = (event: PointerEvent) => {
      if (!hovered || !desktopQuery.matches || !quickX || !quickY) return;

      const rect = image.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      quickX(-x * PARALLAX_X);
      quickY(-y * PARALLAX_Y);
    };

    setupQuickTo();
    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);
    link.addEventListener("pointermove", onMove);

    const onDesktopChange = () => {
      if (!desktopQuery.matches) {
        hovered = false;
        gsap.set(inner, { x: 0, y: 0, scale: 1 });
      }
      setupQuickTo();
    };

    desktopQuery.addEventListener("change", onDesktopChange);

    cleanups.push(() => {
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      link.removeEventListener("pointermove", onMove);
      desktopQuery.removeEventListener("change", onDesktopChange);
      quickX?.tween?.kill();
      quickY?.tween?.kill();
      gsap.killTweensOf(inner);
    });
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
