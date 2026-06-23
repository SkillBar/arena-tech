import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function applyTgMagicTheme(opacity: number) {
  document.documentElement.style.setProperty("--tg-magic-scroll", opacity.toFixed(4));
}

export function setupTgMagicScrollBackground() {
  const overlay = document.querySelector<HTMLElement>(".tg-magic-scroll-bg");
  const tgMagicShell = document.querySelector<HTMLElement>(".project-shell--tg-magic");
  const ctaSection = document.querySelector<HTMLElement>(".cta-section");

  if (!overlay || !tgMagicShell) return undefined;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    gsap.set(overlay, { autoAlpha: 0 });
    applyTgMagicTheme(0);
    return undefined;
  }

  const media = gsap.matchMedia();
  const triggers: ScrollTrigger[] = [];
  let enterProgress = 0;
  let exitProgress = 0;

  const applyOverlayOpacity = () => {
    const opacity = enterProgress * (1 - exitProgress);
    gsap.set(overlay, { autoAlpha: opacity });
    applyTgMagicTheme(opacity);
  };

  media.add("(min-width: 810px)", () => {
    gsap.set(overlay, { autoAlpha: 0 });
    applyTgMagicTheme(0);

    // Y Group → TG Magic: darken while the next card scrolls in.
    const enterTrigger = ScrollTrigger.create({
      trigger: tgMagicShell,
      start: "top bottom",
      end: "top top",
      scrub: 0.4,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        enterProgress = self.progress;
        applyOverlayOpacity();
      }
    });
    triggers.push(enterTrigger);

    if (ctaSection) {
      // TG Magic → Let's Talk: brighten while the CTA section scrolls in.
      const exitTrigger = ScrollTrigger.create({
        trigger: ctaSection,
        start: "top bottom",
        end: "top -20%",
        scrub: 0.52,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          exitProgress = self.progress;
          applyOverlayOpacity();
        }
      });
      triggers.push(exitTrigger);
    }

    return () => {
      enterProgress = 0;
      exitProgress = 0;
      triggers.forEach((trigger) => trigger.kill());
      triggers.length = 0;
    };
  });

  return () => {
    media.revert();
    gsap.set(overlay, { autoAlpha: 0 });
    applyTgMagicTheme(0);
  };
}
