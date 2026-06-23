import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupMusicGenCaseMotion(reducedMotion: boolean) {
  const root = document.querySelector<HTMLElement>(".musicgen-case");
  if (!root) return undefined;

  gsap.registerPlugin(ScrollTrigger);

  const triggers: ScrollTrigger[] = [];
  const animatedTargets = gsap.utils.toArray<HTMLElement>(
    ".musicgen-section, .musicgen-task-card, .musicgen-decision-card, .musicgen-library-step, .musicgen-player-step"
  );
  const steps = gsap.utils.toArray<HTMLElement>(".musicgen-flow-step");
  const panels = gsap.utils.toArray<HTMLElement>(".musicgen-flow-panel");
  const parallaxTargets = gsap.utils.toArray<HTMLElement>(
    ".musicgen-hero-orb, .musicgen-hero-ring, .musicgen-result-ring"
  );
  const paletteColors = gsap.utils.toArray<HTMLElement>(".musicgen-color");
  const waveCard = document.querySelector<HTMLElement>(".musicgen-wave-card");
  const waveBars = gsap.utils.toArray<HTMLElement>(".musicgen-wave-card span");
  const waveMarker = document.querySelector<HTMLElement>(".musicgen-wave-card i");
  const waveMarkerTargets = waveMarker ? [waveMarker] : [];
  const libraryDevices = gsap.utils.toArray<HTMLElement>(".musicgen-library-device");
  const decisionDevices = gsap.utils.toArray<HTMLElement>(".musicgen-decision-mockups .musicgen-device");

  const activateStep = (index: number) => {
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    panels.forEach((panel, panelIndex) =>
      panel.classList.toggle("is-active", panelIndex === index)
    );
  };

  activateStep(0);

  if (reducedMotion) {
    gsap.set(animatedTargets, { autoAlpha: 1, y: 0 });
    gsap.set(panels, { autoAlpha: 1, y: 0, scale: 1 });
    gsap.set(paletteColors, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)" });
    gsap.set(waveBars, { autoAlpha: 1, scaleY: 1 });
    gsap.set(waveMarkerTargets, { xPercent: -50, yPercent: -50 });
    gsap.set([...libraryDevices, ...decisionDevices], { autoAlpha: 1, y: 0, rotate: 0 });
    return () => undefined;
  }

  animatedTargets.forEach((target) => {
    const trigger = ScrollTrigger.create({
      trigger: target,
      start: "top 86%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          target,
          { autoAlpha: 0.001, y: 46 },
          { autoAlpha: 1, y: 0, duration: 0.78, ease: "power3.out" }
        );
      }
    });
    triggers.push(trigger);
  });

  steps.forEach((step, index) => {
    const trigger = ScrollTrigger.create({
      trigger: step,
      start: "top 54%",
      end: "bottom 46%",
      onEnter: () => activateStep(index),
      onEnterBack: () => activateStep(index)
    });
    triggers.push(trigger);
  });

  panels.forEach((panel, index) => {
    gsap.set(panel, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 24,
      scale: index === 0 ? 1 : 0.96
    });
  });

  steps.forEach((step, index) => {
    const panel = panels[index];
    if (!panel) return;

    const trigger = ScrollTrigger.create({
      trigger: step,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        gsap.to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" });
      },
      onLeave: () => {
        if (index < panels.length - 1) {
          gsap.to(panel, { autoAlpha: 0, y: -18, scale: 0.98, duration: 0.35, ease: "power2.out" });
        }
      },
      onEnterBack: () => {
        gsap.to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" });
      },
      onLeaveBack: () => {
        if (index > 0) {
          gsap.to(panel, { autoAlpha: 0, y: 18, scale: 0.96, duration: 0.35, ease: "power2.out" });
        }
      }
    });
    triggers.push(trigger);
  });

  if (paletteColors.length) {
    const shouldPinPalette = window.innerWidth >= 1200;
    const palette = document.querySelector<HTMLElement>(".musicgen-palette");
    const paletteTimeline = gsap.timeline({ defaults: { ease: "none" } });

    gsap.set(paletteColors, { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
    if (palette) {
      gsap.set(palette, { x: shouldPinPalette ? 92 : 0 });
    }

    paletteTimeline.to(
      paletteColors,
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        stagger: 0.075
      },
      0
    );

    if (palette) {
      paletteTimeline.to(
        palette,
        {
          x: 0,
          duration: 1
        },
        0
      );
    }

    const paletteTrigger = ScrollTrigger.create({
      trigger: ".musicgen-system",
      start: shouldPinPalette ? "top 92px" : "top 82%",
      end: shouldPinPalette ? "+=860" : "bottom 42%",
      scrub: 0.75,
      pin: shouldPinPalette,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      animation: paletteTimeline
    });
    triggers.push(paletteTrigger);
  }

  if (waveBars.length) {
    gsap.fromTo(
      waveBars,
      { autoAlpha: 0.45, scaleY: 0.24 },
      {
        autoAlpha: 1,
        scaleY: 1,
        duration: 0.8,
        stagger: { each: 0.018, from: "center" },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".musicgen-wave-card",
          start: "top 82%",
          once: true
        }
      }
    );
  }

  if (waveMarker && waveCard) {
    const markerTrigger = ScrollTrigger.create({
      trigger: waveCard,
      start: "top 80%",
      end: "bottom 35%",
      scrub: 0.35,
      animation: gsap.fromTo(
        waveMarker,
        { left: "12%", xPercent: -50, yPercent: -50, scale: 0.78 },
        { left: "88%", xPercent: -50, yPercent: -50, scale: 1.08, ease: "none" }
      )
    });
    triggers.push(markerTrigger);

    gsap.to(waveMarker, {
      boxShadow: "0 0 0 13px rgba(253, 253, 253, 0.1), 0 0 46px rgba(254, 196, 52, 0.72)",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  if (libraryDevices.length) {
    gsap.fromTo(
      libraryDevices,
      { autoAlpha: 0, y: 92, rotate: -3 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".musicgen-library-showcase",
          start: "top 82%",
          once: true
        }
      }
    );
  }

  if (decisionDevices.length) {
    gsap.fromTo(
      decisionDevices,
      { autoAlpha: 0, y: 72, scale: 0.94 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".musicgen-decision-mockups",
          start: "top 82%",
          once: true
        }
      }
    );
  }

  parallaxTargets.forEach((target, index) => {
    const trigger = ScrollTrigger.create({
      trigger: target.closest("section") ?? target,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.45,
      animation: gsap.fromTo(
        target,
        { y: index % 2 === 0 ? -24 : 22, rotate: index % 2 === 0 ? -4 : 5 },
        { y: index % 2 === 0 ? 42 : -34, rotate: index % 2 === 0 ? 6 : -5, ease: "none" }
      )
    });
    triggers.push(trigger);
  });

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    gsap.killTweensOf([
      ...animatedTargets,
      ...panels,
      ...parallaxTargets,
      ...paletteColors,
      ...waveBars,
      ...libraryDevices,
      ...decisionDevices,
      ...waveMarkerTargets
    ]);
  };
}
