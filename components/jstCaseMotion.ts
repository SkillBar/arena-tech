import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function setupJstParallax(reducedMotion: boolean) {
  const parallaxElements = gsap.utils.toArray<HTMLElement>(
    ".jst-parallax:not(.jst-scrollshow-slide), .jst-case [data-speed]"
  );
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

function setupRegisterScrollshow(reducedMotion: boolean) {
  const section = document.querySelector<HTMLElement>(".jst-register-scroll");
  if (!section) return () => undefined;

  const pinTarget = section.querySelector<HTMLElement>(".jst-register-scroll-pin");
  const slides = gsap.utils.toArray<HTMLElement>(".jst-scrollshow-slide");
  const steps = gsap.utils.toArray<HTMLElement>(".jst-scrollshow-step");
  const progressBar = section.querySelector<HTMLElement>(".jst-scrollshow-progress span");

  if (!pinTarget || slides.length < 2) return () => undefined;

  const media = gsap.matchMedia();
  const triggers: ScrollTrigger[] = [];

  const setActiveStep = (index: number) => {
    steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  };

  media.add("(min-width: 810px)", () => {
    if (reducedMotion) {
      gsap.set(slides, { autoAlpha: 1, clearProps: "position" });
      slides.slice(1).forEach((slide) => gsap.set(slide, { display: "none" }));
      setActiveStep(0);
      return undefined;
    }

    gsap.set(slides, { autoAlpha: 0, position: "absolute", inset: 0, margin: 0 });
    gsap.set(slides[0], { autoAlpha: 1 });
    setActiveStep(0);

    const stepCount = slides.length;
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    slides.forEach((slide, i) => {
      if (i === 0) {
        tl.set(slide, { autoAlpha: 1 }, 0);
      } else {
        tl.set(slide, { autoAlpha: 0 }, 0);
      }
    });

    for (let i = 1; i < stepCount; i++) {
      const at = i;
      tl.to(slides[i - 1], { autoAlpha: 0, duration: 0.12 }, at - 0.12);
      tl.to(slides[i], { autoAlpha: 1, duration: 0.12 }, at - 0.12);
      tl.to({}, { duration: 0.88 }, at - 0.12);
    }

    tl.to({}, { duration: 0.5 });

    const scrollDistance = () => window.innerHeight * stepCount * 1.25;

    const trigger = ScrollTrigger.create({
      trigger: pinTarget,
      pin: true,
      pinSpacing: true,
      start: "top 72px",
      end: () => `+=${scrollDistance()}`,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: tl,
      onUpdate: (self) => {
        if (progressBar) {
          gsap.set(progressBar, { scaleX: self.progress, transformOrigin: "left center" });
        }

        const stepIndex = Math.min(stepCount - 1, Math.floor(self.progress * stepCount));
        setActiveStep(stepIndex);
      }
    });
    triggers.push(trigger);

    return () => {
      triggers.forEach((t) => t.kill());
      triggers.length = 0;
      gsap.set(slides, { clearProps: "all" });
      if (progressBar) gsap.set(progressBar, { clearProps: "transform" });
    };
  });

  media.add("(max-width: 809.98px)", () => {
    gsap.set(slides, { autoAlpha: 1, position: "relative", clearProps: "inset" });
    steps.forEach((step, i) => step.classList.toggle("is-active", i === 0));
    return undefined;
  });

  return () => {
    media.revert();
  };
}

export function setupJstCaseMotion(reducedMotion: boolean) {
  const root = document.querySelector<HTMLElement>(".jst-case");
  if (!root) return undefined;

  gsap.registerPlugin(ScrollTrigger);

  const triggers: ScrollTrigger[] = [];
  const cleanupParallax = setupJstParallax(reducedMotion);
  const cleanupRegisterScroll = setupRegisterScrollshow(reducedMotion);

  const revealTargets = gsap.utils.toArray<HTMLElement>(".jst-reveal");
  const introStage = document.querySelector<HTMLElement>(".jst-intro-stage");

  if (reducedMotion) {
    gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
    return () => {
      cleanupParallax?.();
      cleanupRegisterScroll?.();
    };
  }

  if (introStage) {
    gsap.set(introStage, { y: 0 });

    const introTrigger = ScrollTrigger.create({
      trigger: ".jst-intro",
      start: "top top",
      end: "bottom top",
      scrub: 0.45,
      animation: gsap.fromTo(introStage, { y: 0 }, { y: 56, ease: "none" })
    });
    triggers.push(introTrigger);
  }

  revealTargets.forEach((target) => {
    gsap.set(target, { autoAlpha: 0.001, y: 32 });

    const trigger = ScrollTrigger.create({
      trigger: target,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(target, { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" });
      }
    });
    triggers.push(trigger);
  });

  return () => {
    cleanupParallax?.();
    cleanupRegisterScroll?.();
    triggers.forEach((trigger) => trigger.kill());
    gsap.killTweensOf([...revealTargets, introStage].filter(Boolean));
  };
}
