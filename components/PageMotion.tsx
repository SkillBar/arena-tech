"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupCaseFolderHoverAnimations } from "@/components/caseFolderMotion";
import { setupFloatingLabelAnimations } from "@/components/floatingLabelMotion";
import { setupHeroEntranceAnimations } from "@/components/heroEntranceMotion";
import { setupAiTradeCaseMotion } from "@/components/aiTradeCaseMotion";
import { setupMusicGenCaseMotion } from "@/components/musicGenCaseMotion";
import { setupTgMagicScrollBackground } from "@/components/tgMagicBackgroundMotion";

export function PageMotion({
  home = false,
  musicgen = false,
  aitrade = false
}: {
  home?: boolean;
  musicgen?: boolean;
  aitrade?: boolean;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = gsap.matchMedia();
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.on("scroll", ScrollTrigger.update);

    const lenisRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const splitLetters = (target: HTMLElement) => {
      if (target.dataset.split) return target.querySelectorAll("[data-letter]");
      const text = target.textContent ?? "";
      target.textContent = "";
      target.dataset.split = "true";
      target.setAttribute("aria-label", text);

      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          target.appendChild(document.createTextNode(" "));
          return;
        }

        const word = document.createElement("span");
        word.className = "letter-word";
        word.setAttribute("aria-hidden", "true");

        Array.from(part).forEach((char) => {
          const span = document.createElement("span");
          span.dataset.letter = "true";
          span.textContent = char;
          word.appendChild(span);
        });

        target.appendChild(word);
      });

      return target.querySelectorAll("[data-letter]");
    };

    const animateLetters = (target: HTMLElement, delay = 0) => {
      const letters = splitLetters(target);
      if (!letters?.length) return;

      if (reducedMotion) {
        gsap.set(letters, { autoAlpha: 1, x: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        letters,
        { autoAlpha: 0.001, x: 40, scale: 0.9 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.025,
          ease: "power3.out",
          delay,
          scrollTrigger: delay
            ? undefined
            : {
                trigger: target,
                start: "top 85%",
                once: true
              }
        }
      );
    };

    const heroTitle = document.querySelector<HTMLElement>(".hero-name-title");
    const cleanupHeroEntrance = home ? setupHeroEntranceAnimations(splitLetters, reducedMotion) : undefined;

    if (home && heroTitle && reducedMotion) {
      splitLetters(heroTitle);
    }

    document
      .querySelectorAll<HTMLElement>(home ? ".letter-reveal:not(.hero-name-title)" : ".letter-reveal")
      .forEach((target) => animateLetters(target));

    const heroLines = document.querySelector<HTMLElement>(".hero-lines");
    const heroLineItems = gsap.utils.toArray<HTMLElement>(".hero-line-reveal");

    if (home && heroLines && heroLineItems.length) {
      if (reducedMotion) {
        gsap.set(heroLines, { height: "auto", overflow: "visible" });
        gsap.set(heroLineItems, { autoAlpha: 1, y: 0 });
      } else {
        gsap.set(heroLines, { height: 0, overflow: "hidden" });
        gsap.set(heroLineItems, { autoAlpha: 0, y: 32 });

        const heroLineTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "+=90",
            toggleActions: "play none none reverse"
          }
        });

        heroLineTimeline
          .to(heroLines, {
            height: "auto",
            duration: 0.75,
            ease: "power3.out"
          })
          .to(
            heroLineItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out"
            },
            0
          );
      }
    }

    gsap.utils
      .toArray<HTMLElement>(".reveal-line, .case-folder-card, .case-detail-image, .case-text-block, .case-note, .case-stub-panel")
      .forEach((element) => {
        if (reducedMotion) {
          gsap.set(element, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          element,
          { autoAlpha: 0.001, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true
            }
          }
        );
      });

    media.add("(max-width: 809px)", () => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        if (reducedMotion) return;
        gsap.fromTo(
          card,
          { y: 38 },
          {
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true
            }
          }
        );
      });

      return undefined;
    });

    if (home) {
      media.add("(min-width: 810px)", () => {
        const shells = gsap.utils.toArray<HTMLElement>(".project-shell");
        shells.slice(0, -1).forEach((shell, index) => {
          const card = shell.querySelector<HTMLElement>(".project-card");
          const nextShell = shells[index + 1];
          if (!card || !nextShell) return;
          const content = card.querySelector<HTMLElement>(".project-content");
          const image = card.querySelector<HTMLElement>(".project-image img");

          if (content) {
            gsap.set(content, { opacity: 1 });
          }

          if (image) {
            gsap.set(image, { filter: "brightness(1) saturate(1)" });
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: nextShell,
              start: "top bottom",
              end: "top top",
              scrub: 0.35,
              invalidateOnRefresh: true
            }
          });

          if (content) {
            timeline.fromTo(
              content,
              { opacity: 1 },
              { opacity: 0.58, ease: "none" },
              0
            );
          }

          if (image) {
            timeline.fromTo(
              image,
              { filter: "brightness(1) saturate(1)" },
              { filter: "brightness(0.92) saturate(0.96)", ease: "none" },
              0
            );
          }
        });

        return undefined;
      });
    }

    const cleanupFloatingLabels = home ? setupFloatingLabelAnimations() : undefined;
    const cleanupTgMagicBackground = home ? setupTgMagicScrollBackground() : undefined;
    const cleanupMusicGenCase = musicgen ? setupMusicGenCaseMotion(reducedMotion) : undefined;
    const cleanupAiTradeCase = aitrade ? setupAiTradeCaseMotion(reducedMotion) : undefined;
    const cleanupCaseFolderHover = setupCaseFolderHoverAnimations();

    const commentCard = document.querySelector<HTMLElement>(".comment-card");
    if (commentCard) {
      if (reducedMotion) {
        gsap.set(commentCard, { autoAlpha: 1, y: 0, scale: 1 });
      } else {
        gsap.fromTo(
          commentCard,
          { autoAlpha: 0, y: 20, scale: 0.8 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ".cta-card",
              start: "top 60%",
              once: true
            }
          }
        );
      }
    }

    const stroke = document.querySelector<SVGPathElement>(".cta-stroke-path");
    if (stroke) {
      const length = stroke.getTotalLength();
      gsap.set(stroke, {
        strokeDasharray: length,
        strokeDashoffset: reducedMotion ? 0 : length
      });

      if (!reducedMotion) {
        gsap.to(stroke, {
          strokeDashoffset: 0,
          duration: 4.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-card",
            start: "top 72%",
            once: true
          }
        });
      }
    }

    ScrollTrigger.clearScrollMemory?.();
    ScrollTrigger.refresh(true);

    return () => {
      cleanupFloatingLabels?.();
      cleanupTgMagicBackground?.();
      cleanupMusicGenCase?.();
      cleanupAiTradeCase?.();
      cleanupCaseFolderHover?.();
      cleanupHeroEntrance?.();
      gsap.ticker.remove(lenisRaf);
      media.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [home, musicgen, aitrade]);

  return null;
}
