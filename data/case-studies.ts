export type CaseMetaNote = {
  label: string;
  value: string;
  color: string;
  rotation: number;
};

export type CaseStudySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
};

export type CaseStudy = {
  number: string;
  slug: string;
  variant?: "default" | "musicgen-presentation" | "aitrade-presentation";
  title: string;
  date: string;
  summary: string;
  tags: string[];
  accent: string;
  textColor: "dark" | "light";
  cover: string;
  coverAlt: string;
  showOnHome?: boolean;
  externalUrl?: string;
  metaNotes?: CaseMetaNote[];
  detailSections?: CaseStudySection[];
};

const localKeepNotes: CaseMetaNote[] = [
  { label: "Role", value: "Product Design", color: "#a4e5f8", rotation: -4 },
  { label: "Timeline", value: "8 Weeks", color: "#f5dda1", rotation: 7 },
  { label: "Team", value: "Design + PM", color: "#a1dfc5", rotation: 5 },
  { label: "Platform", value: "Mobile App", color: "#fabed1", rotation: 2 }
];

const musicGenNotes: CaseMetaNote[] = [
  { label: "Role", value: "Product Design", color: "#fec434", rotation: -4 },
  { label: "Timeline", value: "6 Weeks", color: "#fe9511", rotation: 7 },
  { label: "Team", value: "Design + AI", color: "#2b2b2b", rotation: 5 },
  { label: "Platform", value: "iOS / Android", color: "#fdfdfd", rotation: 2 }
];

export const caseStudies: CaseStudy[] = [
  {
    number: "project 01",
    slug: "local-keep",
    title: "Lokal Keep",
    externalUrl: "https://join.lokalkeep.ru",
    date: "Mar 19, 2026",
    summary:
      "Мобильное приложение для поиска и бронирования камер хранения багажа рядом с вами.",
    tags: ["Mobile", "Travel"],
    accent: "#0E69E6",
    textColor: "light",
    cover: "/assets/images/project-local-keep-dashboard.webp",
    coverAlt: "Local Keep partner dashboard on laptop and new booking screen on iPhone",
    metaNotes: localKeepNotes,
    detailSections: [
      {
        title: "The Real Problem",
        paragraphs: [
          "Travelers often lose hours dragging luggage through a city between check-out and a flight. They need a nearby place to store bags quickly, with clear pricing and availability.",
          "The product had to make discovery feel instant: open the map, compare points, and book storage without friction."
        ],
        image: "/assets/images/project-local-keep-dashboard.webp",
        imageAlt: "Local Keep partner dashboard with recent booking requests"
      },
      {
        title: "Finding the Fix",
        paragraphs: [
          "The strongest direction grouped patient signals by action, not by source system. That made the interface feel less like a database and more like a daily operating surface.",
          "We tested the flow around three jobs: triage a queue, review a patient, and hand off the next action without losing accountability."
        ],
        bullets: [
          "Prioritize the patient queue by urgency and ownership.",
          "Keep clinical context visible while reducing duplicated fields.",
          "Make handoffs explicit enough for managers to audit later."
        ],
        image: "/assets/images/workspace.webp",
        imageAlt: "Workspace board with product planning materials"
      },
      {
        title: "What Actually Happened",
        paragraphs: [
          "The first prototype looked polished, but it still asked clinicians to interpret too much. The second version moved critical status, timing, and owner cues into the same visual lane.",
          "That shift made the product easier to scan and gave the team a calmer way to make decisions during busy operating windows."
        ],
        image: "/assets/images/project-stylebook.webp",
        imageAlt: "Interface reference image used as a placeholder for product screens"
      },
      {
        title: "What Changed",
        paragraphs: [
          "The final system centered the workflow around the next safest action. It created stronger queue hygiene, reduced unnecessary clicks, and made review meetings easier to run.",
          "Just as important, the product team ended with a reusable pattern for future care programs instead of a one-off dashboard."
        ],
        image: "/assets/images/project-homestead.webp",
        imageAlt: "Product storytelling placeholder image for project outcomes"
      },
      {
        title: "What I Had to Work With",
        paragraphs: [
          "The constraints were familiar: partial data access, mixed stakeholder priorities, and a workflow that had grown around exceptions. The design needed to respect those realities instead of pretending they did not exist."
        ]
      },
      {
        title: "What I'd Do Differently",
        paragraphs: [
          "I would bring implementation partners into the prototype critique earlier. The workflow decisions were right, but earlier technical feedback would have tightened the transition from concept to build."
        ],
        image: "/assets/images/project-north-light.webp",
        imageAlt: "Product strategy placeholder image for project reflection"
      }
    ]
  },
  {
    number: "project 02",
    slug: "musicgen",
    variant: "musicgen-presentation",
    title: "MusicGen AI",
    date: "Mar 2, 2026",
    summary:
      "Мобильный AI-сервис, который превращает идею, текст или изображение в готовый музыкальный трек.",
    tags: ["AI Music", "Mobile App", "Prompt-to-track"],
    accent: "#0B0B0B",
    textColor: "light",
    cover: "/assets/images/project-musicgen.webp",
    coverAlt: "musicgen cover mockup with headphones and Music Gen card on a desk",
    metaNotes: musicGenNotes,
    detailSections: [
      {
        title: "The Real Problem",
        paragraphs: [
          "Most people have a melody, mood, or reference track in mind long before they know how to produce it. Existing tools either demand a full DAW workflow or produce generic output with no sense of authorship.",
          "musical.ai needed to feel approachable from the first prompt while still giving creators enough control to shape a track they would actually keep."
        ],
        image: "/assets/images/project-musicgen.webp",
        imageAlt: "Music Gen app mockup with headphones and prompt-to-track card on a desk"
      },
      {
        title: "Finding the Fix",
        paragraphs: [
          "The strongest direction broke generation into a short guided flow instead of one overwhelming screen. Each step surfaced one decision at a time: prompt, genre, tempo, and final polish.",
          "We tested the experience around three jobs: start from a text prompt, refine the generated draft, and export or share without losing the creative thread."
        ],
        bullets: [
          "Keep the prompt input visible as the anchor for every iteration.",
          "Expose advanced controls progressively instead of upfront.",
          "Make regeneration feel fast, reversible, and low-risk."
        ],
        image: "/assets/images/workspace.webp",
        imageAlt: "Workspace board with Music Gen product planning materials"
      },
      {
        title: "What Actually Happened",
        paragraphs: [
          "The first prototype looked polished, but it buried the AI output under too many settings. The second version pulled playback, waveform preview, and prompt history into one focused lane.",
          "That shift made the product easier to scan and gave users a clearer sense of progress from idea to finished track."
        ],
        image: "/assets/images/project-stylebook.webp",
        imageAlt: "Interface reference image used as a placeholder for Music Gen screens"
      },
      {
        title: "What Changed",
        paragraphs: [
          "The final system centered the workflow around prompt-to-track generation with lightweight editing on top. It reduced dead ends, made iteration feel playful, and gave the team a reusable pattern for future AI media tools.",
          "Just as important, the product ended with a structure that could scale to new models and output formats without redesigning the whole app."
        ],
        image: "/assets/images/project-homestead.webp",
        imageAlt: "Product storytelling placeholder image for Music Gen outcomes"
      },
      {
        title: "What I Had to Work With",
        paragraphs: [
          "The constraints were familiar: evolving model capabilities, uncertain generation times, and a user base split between casual creators and more experienced producers. The design needed to stay flexible while the technology kept changing underneath."
        ]
      },
      {
        title: "What I'd Do Differently",
        paragraphs: [
          "I would bring audio engineering partners into the prototype critique earlier. The interaction model was right, but earlier feedback on latency, export formats, and playback behavior would have tightened the transition from concept to build."
        ],
        image: "/assets/images/project-north-light.webp",
        imageAlt: "Product strategy placeholder image for Music Gen reflection"
      }
    ]
  },
  {
    number: "project 03",
    slug: "homestead",
    title: "Y Group",
    date: "Jan 2, 2025",
    summary:
      "Платформа для профессионалов курортной недвижимости: каталог объектов, сделки и комиссии.",
    tags: ["Proptech", "0 -> 1"],
    accent: "#0A9636",
    textColor: "light",
    cover: "/assets/images/project-homestead.webp",
    coverAlt: "YGROUP resort real estate platform mockup on a laptop in a showroom"
  },
  {
    number: "project 04",
    slug: "north-light",
    title: "TG Magic",
    date: "Mar 19, 2026",
    summary:
      "AI-powered matching with verified Telegram developers and low-code experts.",
    tags: ["Telegram", "AI"],
    accent: "#9333EA",
    textColor: "light",
    cover: "/assets/images/project-tg-magic.webp",
    coverAlt: "TG Magic workspace with laptop dashboard, wizard hat, and purple ambient lighting"
  },
  {
    number: "project 05",
    slug: "ai-trade",
    variant: "aitrade-presentation",
    title: "AI Trade",
    date: "Apr 8, 2026",
    showOnHome: false,
    summary:
      "Сфотографировал график — через минуту понимаешь тренд, риски и конкретные уровни входа. Без таблиц и лишних экранов.",
    tags: ["Fintech", "AI", "Mobile App"],
    accent: "#00D7B3",
    textColor: "light",
    cover: "/assets/images/project-hyperart.webp",
    coverAlt: "AI Trade cover mockup with phones showing Chart AI trading insights and market analysis screens"
  },
  {
    number: "project 06",
    slug: "game-r",
    title: "GAME • R",
    date: "May 12, 2026",
    showOnHome: false,
    summary:
      "Игровая платформа с фокусом на быстрый матчмейкинг, live-события и социальный слой для командных сессий.",
    tags: ["Game", "Mobile", "Live Ops"],
    accent: "#00E676",
    textColor: "light",
    cover: "/assets/images/project-game-r.webp",
    coverAlt: "GameR cover mockup with mobile quest screens, loot crate, and tactical game character"
  },
  {
    number: "project 07",
    slug: "jst-project",
    title: "JST Project",
    date: "May 28, 2026",
    showOnHome: false,
    summary:
      "Платформа для управления проектами и командной работы с акцентом на прозрачные процессы, статусы и быстрый обмен контекстом.",
    tags: ["SaaS", "Web", "Team Tools"],
    accent: "#2563EB",
    textColor: "light",
    cover: "/assets/images/project-jst-project.webp",
    coverAlt: "JST Project cover mockup"
  }
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyHref(caseStudy: Pick<CaseStudy, "slug" | "externalUrl">) {
  return caseStudy.externalUrl ?? `/case-study/${caseStudy.slug}`;
}

export function getCaseStudySummaries() {
  return caseStudies.map(({ detailSections, ...summary }) => {
    void detailSections;
    return summary;
  });
}
