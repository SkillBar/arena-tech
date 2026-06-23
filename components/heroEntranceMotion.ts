import gsap from "gsap";

export const HERO_ENTRANCE_DELAY = 1.85;

type SplitLetters = (target: HTMLElement) => NodeListOf<Element>;

function revealElements(elements: Array<HTMLElement | null | undefined>, reducedMotion: boolean) {
  const targets = elements.filter(Boolean) as HTMLElement[];
  if (!targets.length) return;

  if (reducedMotion) {
    gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
    return;
  }

  gsap.set(targets, { autoAlpha: 0, y: 32 });
}

function animateUp(
  timeline: gsap.core.Timeline,
  elements: Array<HTMLElement | null | undefined>,
  position: gsap.Position,
  vars: gsap.TweenVars = {}
) {
  const targets = elements.filter(Boolean) as HTMLElement[];
  if (!targets.length) return;

  timeline.to(
    targets,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      ...vars
    },
    position
  );
}

export function setupHeroEntranceAnimations(
  splitLetters: SplitLetters,
  reducedMotion: boolean
) {
  const section = document.querySelector<HTMLElement>(".hero-section");
  if (!section) return undefined;

  const hand = section.querySelector<HTMLElement>(".hero-hand");
  const title = section.querySelector<HTMLElement>(".hero-name-title");
  const statusCurrent = section.querySelector<HTMLElement>(".status-current");
  const statusPrevious = section.querySelector<HTMLElement>(".status-previous");
  const availability = section.querySelector<HTMLElement>(".availability");
  const projectStickers = gsap.utils.toArray<HTMLElement>(".hero-project-sticker");
  const labels = gsap.utils.toArray<HTMLElement>(".floating-label");

  const cleanups: Array<() => void> = [];
  const timelines: gsap.core.Timeline[] = [];

  const buildTimeline = (includeDesktopExtras: boolean) => {
    revealElements([hand, availability], reducedMotion);

    if (includeDesktopExtras) {
      revealElements([statusCurrent, statusPrevious, ...projectStickers, ...labels], reducedMotion);
    }

    if (title) {
      const letters = splitLetters(title);
      if (reducedMotion) {
        gsap.set(letters, { autoAlpha: 1, x: 0, scale: 1 });
      } else {
        gsap.set(letters, { autoAlpha: 0.001, x: 40, scale: 0.9 });
      }
    }

    if (reducedMotion) {
      section.classList.add("is-entered");
      return null;
    }

    if (includeDesktopExtras && statusCurrent) {
      gsap.set(statusCurrent, { rotation: 14, transformOrigin: "50% 50%" });
    }

    if (includeDesktopExtras && statusPrevious) {
      gsap.set(statusPrevious, { rotation: -8, transformOrigin: "50% 50%" });
    }

    if (includeDesktopExtras) {
      gsap.set(projectStickers, { autoAlpha: 0, y: 24, scale: 0.72, transformOrigin: "50% 100%" });
    }

    const timeline = gsap.timeline({
      delay: HERO_ENTRANCE_DELAY,
      onComplete: () => {
        section.classList.add("is-entered");
      }
    });

    animateUp(timeline, [hand], 0, { duration: 0.65 });

    if (title) {
      const letters = title.querySelectorAll("[data-letter]");
      timeline.fromTo(
        letters,
        { autoAlpha: 0.001, x: 40, scale: 0.9 },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.03,
          ease: "back.out(1.7)"
        },
        0.08
      );
    }

    if (includeDesktopExtras) {
      animateUp(timeline, [statusCurrent], 0.28, { duration: 0.65 });
      animateUp(timeline, [statusPrevious], 0.38, { duration: 0.65 });
    }

    animateUp(timeline, [availability], includeDesktopExtras ? 0.48 : 0.24, { duration: 0.65 });

    if (includeDesktopExtras && projectStickers.length) {
      timeline.to(
        projectStickers,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "back.out(1.5)"
        },
        0.58
      );

      timeline.to(
        labels,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out"
        },
        0.72
      );
    }

    return timeline;
  };

  const mobile = gsap.matchMedia();
  mobile.add("(max-width: 809px)", () => {
    const timeline = buildTimeline(false);
    if (timeline) timelines.push(timeline);
    return () => timeline?.kill();
  });

  mobile.add("(min-width: 810px)", () => {
    const timeline = buildTimeline(true);
    if (timeline) timelines.push(timeline);
    return () => timeline?.kill();
  });

  cleanups.push(() => {
    mobile.revert();
    timelines.forEach((timeline) => timeline.kill());
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}
