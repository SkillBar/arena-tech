import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/data/case-studies";
import { CTA } from "@/components/CTA";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { PageMotion } from "@/components/PageMotion";
import { Ruler } from "@/components/Ruler";

type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const screens = {
  hero: {
    src: "/assets/images/jst/hero-main.webp",
    alt: "Главный экран лаунчера Province — новости, список серверов и кнопка Играть",
    width: 1600,
    height: 1000
  },
  serverList: {
    src: "/assets/images/jst/server-list.webp",
    alt: "Список серверов Province RP с онлайном и кнопкой Играть",
    width: 1275,
    height: 731
  },
  auth: {
    src: "/assets/images/jst/auth.webp",
    alt: "Экран авторизации MTA Province для игрового сервера",
    width: 960,
    height: 600
  },
  layoutGrid: {
    src: "/assets/images/jst/layout-grid.webp",
    alt: "Главный экран лаунчера — сетка серверов и блок новостей",
    width: 1240,
    height: 735
  },
  layoutColumns: {
    src: "/assets/images/jst/layout-columns.webp",
    alt: "Альтернативная раскладка — серверы по центру, новости справа",
    width: 1235,
    height: 715
  },
  promo: {
    src: "/assets/images/jst/promo-update.webp",
    alt: "Промо-арт обновления игрового лаунчера JST Project",
    width: 1000,
    height: 1000
  },
  registerAccount: {
    src: "/assets/images/jst/register-account.webp",
    alt: "Регистрация — шаг Аккаунт: логин и пароль",
    width: 960,
    height: 600
  },
  registerEmail: {
    src: "/assets/images/jst/register-email.webp",
    alt: "Регистрация — шаг Почта: ввод проверочного кода",
    width: 960,
    height: 600
  },
  registerCharacter: {
    src: "/assets/images/jst/register-character.webp",
    alt: "Регистрация — шаг Персонаж: имя, пол и город появления",
    width: 960,
    height: 600
  },
  registerSuccess: {
    src: "/assets/images/jst/register-success.webp",
    alt: "Экран успешной регистрации аккаунта с персонажем",
    width: 960,
    height: 600
  },
  settings: {
    src: "/assets/images/jst/settings.webp",
    alt: "Настройки лаунчера — директория, целостность файлов и моды",
    width: 1220,
    height: 740
  }
} as const;

const heroLead =
  "Новости, онлайн серверов и кнопка «Играть» — в одном окне. Игрок выбирает Province RP и заходит без ручной настройки MTA.";

const tasks = [
  "Собрать вход в игру, новости и экосистему проекта в одном desktop-приложении",
  "Сделать онлайн серверов и путь к кнопке «Играть» читаемыми с первого экрана",
  "Спроектировать регистрацию и авторизацию как связный сценарий для новичка"
];

const ecosystemCards = [
  {
    title: "Навигация",
    accent: "#E85555",
    text: "Sidebar ведёт в лаунчер, форум, Province Info, Radio Province и JST LIVE — экосистема проекта рядом с игрой."
  },
  {
    title: "Серверы",
    accent: "#4ADE80",
    text: "Список Province RP #1–7, текущий и суточный онлайн, статус версии — всё видно до нажатия «Играть»."
  },
  {
    title: "Онбординг",
    accent: "#FFFFFF",
    text: "Авторизация привязана к серверу, регистрация — три шага: аккаунт, почта с кодом, создание персонажа."
  }
];

const registerSteps = [
  {
    label: "01",
    title: "Аккаунт",
    text: "Логин и пароль",
    screen: screens.registerAccount
  },
  {
    label: "02",
    title: "Почта",
    text: "Код из письма",
    screen: screens.registerEmail
  },
  {
    label: "03",
    title: "Персонаж",
    text: "Имя, пол, город",
    screen: screens.registerCharacter
  }
] as const;

const splitSections = [
  {
    id: "layout",
    kicker: "Главный экран",
    title: "Новости и серверы в одном окне",
    text: "Пробовали две раскладки: сетка серверов с новостями сверху и колоночный вариант — серверы по центру, лента справа. В обоих онлайн и CTA остаются на виду.",
    screens: [screens.layoutGrid, screens.layoutColumns],
    reverse: false
  },
  {
    id: "servers",
    kicker: "Список серверов",
    title: "Онлайн виден до клика «Играть»",
    text: "У каждого сервера — зелёный статус, заполненность 311 / 815 и быстрый play. Сверху — текущий и суточный онлайн, внизу — статус установленной версии.",
    screens: [screens.serverList],
    reverse: true
  },
  {
    id: "auth",
    kicker: "Авторизация",
    title: "Вход привязан к серверу",
    text: "Экран показывает MTA Province и номер сервера. Логин, пароль, восстановление и регистрация — на одной панели, без лишних переходов.",
    screens: [screens.auth],
    reverse: false
  },
  {
    id: "success",
    kicker: "Подтверждение",
    title: "Аккаунт готов — можно войти",
    text: "После регистрации — короткий экран с именем персонажа и одной кнопкой «Войти». Без лишних инструкций и второго круга форм.",
    screens: [screens.registerSuccess],
    reverse: false
  },
  {
    id: "settings",
    kicker: "Настройки",
    title: "Путь, целостность и моды",
    text: "Директория установки, проверка целостности игры, чекбоксы замены ресурсов — погода, эффекты, транспорт. Внизу — ссылка в техподдержку.",
    screens: [screens.settings],
    reverse: true
  }
];

const palette = [
  { color: "#121212", label: "App background" },
  { color: "#1E1E1E", label: "Panel surface" },
  { color: "#E85555", label: "Primary CTA" },
  { color: "#FFFFFF", label: "Primary text" },
  { color: "#4ADE80", label: "Online status" }
];

export function JstCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <Header />
      <PageMotion jst />
      <main className="canvas-page jst-case">
        <Ruler />
        <article>
          <section className="jst-intro">
            <div className="jst-intro-copy jst-reveal">
              <p className="jst-eyebrow">Desktop · Game · Launcher</p>
              <h1 className="jst-intro-title letter-reveal">{caseStudy.title}</h1>
              <p className="jst-intro-lead reveal-line">{heroLead}</p>
            </div>

            <div className="jst-intro-stage" aria-label="JST Project hero composition">
              <ScreenShot className="jst-stage-hero" screen={screens.hero} priority />
            </div>
          </section>

          <section className="jst-overview jst-block">
            <div className="jst-block-head jst-reveal">
              <h2>О проекте</h2>
              <p>
                JST Project — desktop-лаунчер для MTA Province, мультиплеерного мода GTA San Andreas
                от JS Team. Раньше игрок настраивал клиент вручную; лаунчер собирает новости,
                выбор сервера и вход в игру в одном окне.
              </p>
            </div>

            {caseStudy.metaNotes?.length ? (
              <div className="jst-meta jst-reveal">
                {caseStudy.metaNotes.map((note) => (
                  <div
                    key={note.label}
                    className="jst-meta-note"
                    style={
                      {
                        "--note-color": note.color,
                        "--note-rotation": `${note.rotation}deg`
                      } as CSSProperties
                    }
                  >
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="jst-tasks jst-reveal">
              <h3>Задачи</h3>
              <ul>
                {tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>

            <div className="jst-ecosystem">
              {ecosystemCards.map((card) => (
                <article
                  key={card.title}
                  className="jst-ecosystem-card jst-reveal"
                  style={{ "--card-accent": card.accent } as CSSProperties}
                >
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="jst-look jst-block">
            <div className="jst-block-head jst-reveal">
              <h2>Как это выглядит</h2>
              <p>
                Промо-арт фиксирует главное обновление: лаунчер как единая точка входа — серверы,
                онлайн и новости проекта в одном интерфейсе.
              </p>
            </div>
            <div className="jst-look-scene">
              <ScreenShot className="jst-look-shot" screen={screens.promo} />
            </div>
          </section>

          {splitSections.flatMap((section) => {
            const blocks = [
              <FeatureSection key={section.id} section={section} />
            ];

            if (section.id === "auth") {
              blocks.push(<RegisterScrollSection key="register" />);
            }

            return blocks;
          })}

          <section className="jst-colors jst-block">
            <div className="jst-block-head jst-reveal">
              <h2>Цвет и типографика</h2>
              <p>
                Тёмный gaming UI: фон #121212, панели #1E1E1E, красный для CTA и акцентов, зелёный
                для статуса online. Шрифт — TT Firs Neue: medium для текста, demibold для заголовков.
              </p>
            </div>
            <div className="jst-palette jst-reveal">
              {palette.map((item) => (
                <div
                  key={item.color}
                  className="jst-swatch"
                  style={{ "--swatch": item.color } as CSSProperties}
                >
                  <span>{item.color}</span>
                  <em>{item.label}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="jst-outro jst-block">
            <div className="jst-outro-copy jst-reveal">
              <h2>Итог</h2>
              <p>
                Лаунчер стал единой точкой входа в Province RP: новости и экосистема проекта —
                рядом с серверами, путь новичка — через понятную регистрацию, опытным игрокам —
                настройки и проверка файлов в одном месте.
              </p>
              <Link href="/case-study" className="jst-back-link" data-cursor>
                ← Все кейсы
              </Link>
            </div>
            <div className="jst-outro-visual jst-reveal">
              <ScreenShot className="jst-outro-shot" screen={screens.hero} />
            </div>
          </section>
        </article>
        <CTA />
      </main>
      <CustomCursor />
    </>
  );
}

function FeatureSection({
  section
}: {
  section: (typeof splitSections)[number];
}) {
  const visualClass =
    section.screens.length > 1 ? "jst-feature-visual--duo" : "jst-feature-visual--single";

  return (
    <section className="jst-feature jst-block">
      <div className="jst-feature-copy jst-reveal">
        <p className="jst-feature-kicker">{section.kicker}</p>
        <h2>{section.title}</h2>
        <p>{section.text}</p>
      </div>
      <div className={`jst-feature-visual ${visualClass}`}>
        {section.screens.map((screen) => (
          <ScreenShot key={screen.src} className="jst-feature-shot" screen={screen} />
        ))}
      </div>
    </section>
  );
}

function RegisterScrollSection() {
  return (
    <section className="jst-register-scroll jst-block">
      <div className="jst-register-scroll-head">
        <div className="jst-feature-copy jst-reveal">
          <p className="jst-feature-kicker">Регистрация</p>
          <h2>Три шага до первого персонажа</h2>
          <p>
            Аккаунт → подтверждение почты кодом → персонаж с выбором пола и города: Приволжск,
            Мирный или Невский. Листайте — экран меняется на каждом шаге.
          </p>
        </div>
      </div>

      <div className="jst-register-scroll-pin">
        <ol className="jst-scrollshow-steps" aria-label="Шаги регистрации">
          {registerSteps.map((step, index) => (
            <li
              key={step.label}
              className={`jst-scrollshow-step${index === 0 ? " is-active" : ""}`}
            >
              <span>{step.label}</span>
              <strong>{step.title}</strong>
            </li>
          ))}
        </ol>

        <div className="jst-scrollshow-progress" aria-hidden="true">
          <span />
        </div>

        <div className="jst-scrollshow-slides">
          {registerSteps.map((step, index) => (
            <ScreenShot
              key={step.screen.src}
              className={`jst-scrollshow-slide${index === 0 ? " is-active" : ""}`}
              screen={step.screen}
            />
          ))}
        </div>

        <p className="jst-scrollshow-hint">Листайте, чтобы пройти все шаги</p>
      </div>
    </section>
  );
}

function ScreenShot({
  screen,
  className,
  dataSpeed,
  priority = false
}: {
  screen: Screen;
  className?: string;
  dataSpeed?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`jst-shot ${className ?? ""}`}
      {...(dataSpeed ? { "data-speed": dataSpeed } : {})}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        sizes="(max-width: 809px) 92vw, min(1200px, 92vw)"
        priority={priority}
      />
    </figure>
  );
}
