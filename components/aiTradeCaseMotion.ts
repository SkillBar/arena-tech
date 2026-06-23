import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function setupMercuryParallax(reducedMotion: boolean) {
  const parallaxElements = gsap.utils.toArray<HTMLElement>(".aitrade-parallax, [data-speed]");
  if (!parallaxElements.length) return () => undefined;

  const media = gsap.matchMedia();
  const triggers: ScrollTrigger[] = [];

  media.add("(min-width: 810px)", () => {
    if (reducedMotion) {
      gsap.set(parallaxElements, { y: 0, clearProps: "transform" });
      return undefined;
    }

    const updateParallax = () => {
      const scrollCenter = window.innerHeight / 2 + window.scrollY;

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.dataset.speed ?? "0");
        if (!speed) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const offset = elementTop - scrollCenter;
        gsap.set(element, { y: offset * speed });
      });
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      onUpdate: updateParallax,
      onRefresh: updateParallax
    });
    triggers.push(trigger);
    updateParallax();

    return () => {
      trigger.kill();
      gsap.set(parallaxElements, { clearProps: "transform" });
    };
  });

  return () => {
    media.revert();
    triggers.forEach((trigger) => trigger.kill());
  };
}

export function setupAiTradeCaseMotion(reducedMotion: boolean) {
  const root = document.querySelector<HTMLElement>(".aitrade-case");
  if (!root) return undefined;

  gsap.registerPlugin(ScrollTrigger);

  const triggers: ScrollTrigger[] = [];
  const cleanupParallax = setupMercuryParallax(reducedMotion);

  const revealTargets = gsap.utils.toArray<HTMLElement>(".aitrade-reveal");
  const reviewBlocks = gsap.utils.toArray<HTMLElement>(".aitrade-reviews-metric");
  const designShots = gsap.utils.toArray<HTMLElement>(".aitrade-design-shot");
  const introStage = document.querySelector<HTMLElement>(".aitrade-intro-stage");

  if (reducedMotion) {
    gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
    gsap.set(reviewBlocks, { autoAlpha: 1, y: 0 });
    gsap.set(designShots, { autoAlpha: 1, y: 0 });
    return () => {
      cleanupParallax?.();
    };
  }

  if (introStage) {
    const introTrigger = ScrollTrigger.create({
      trigger: ".aitrade-intro",
      start: "top top",
      end: "bottom top",
      scrub: 0.45,
      animation: gsap.fromTo(introStage, { y: 0 }, { y: 72, ease: "none" })
    });
    triggers.push(introTrigger);
  }

  revealTargets.forEach((target) => {
    gsap.set(target, { autoAlpha: 0.001, y: 36 });

    const trigger = ScrollTrigger.create({
      trigger: target,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(target, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" });
      }
    });
    triggers.push(trigger);
  });

  if (designShots.length) {
    gsap.fromTo(
      designShots,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".aitrade-design-stage",
          start: "top 78%",
          once: true
        }
      }
    );
  }

  if (reviewBlocks.length) {
    gsap.fromTo(
      reviewBlocks,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".aitrade-reviews-metrics",
          start: "top 86%",
          once: true
        }
      }
    );
  }

  return () => {
    cleanupParallax?.();
    triggers.forEach((trigger) => trigger.kill());
    gsap.killTweensOf([...revealTargets, ...reviewBlocks, ...designShots, introStage].filter(Boolean));
  };
}
