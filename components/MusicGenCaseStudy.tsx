import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/data/case-studies";
import { CTA } from "@/components/CTA";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { PageMotion } from "@/components/PageMotion";
import { Ruler } from "@/components/Ruler";

const screens = {
  notification: {
    src: "/assets/images/musicgen/musicgen-notification.webp",
    alt: "Экран MusicGen AI с включением уведомлений о готовом треке",
    width: 393,
    height: 852
  },
  createDescription: {
    src: "/assets/images/musicgen/musicgen-create-description.webp",
    alt: "Экран создания трека по описанию с выбором настроения и жанра",
    width: 393,
    height: 907
  },
  createKeyboard: {
    src: "/assets/images/musicgen/musicgen-create-keyboard.webp",
    alt: "Экран ввода промпта для генерации музыки",
    width: 393,
    height: 852
  },
  libraryEmpty: {
    src: "/assets/images/musicgen/musicgen-library-empty.webp",
    alt: "Пустое состояние библиотеки MusicGen AI с кнопкой создания первого трека",
    width: 393,
    height: 852
  },
  libraryEmptyOffer: {
    src: "/assets/images/musicgen/musicgen-library-empty-offer.webp",
    alt: "Библиотека MusicGen AI с промо-блоком подписки",
    width: 393,
    height: 852
  },
  libraryListShort: {
    src: "/assets/images/musicgen/musicgen-library-list-short.webp",
    alt: "Библиотека MusicGen AI со статусами генерации и списком треков",
    width: 393,
    height: 852
  },
  libraryClipsEmpty: {
    src: "/assets/images/musicgen/musicgen-library-clips-empty.webp",
    alt: "Пустое состояние раздела клипов в MusicGen AI",
    width: 393,
    height: 852
  },
  libraryClipsGrid: {
    src: "/assets/images/musicgen/musicgen-library-clips-grid.webp",
    alt: "Сетка сгенерированных клипов в библиотеке MusicGen AI",
    width: 393,
    height: 852
  },
  playerCover: {
    src: "/assets/images/musicgen/musicgen-player-cover.webp",
    alt: "Компактный экран плеера MusicGen AI с обложкой трека",
    width: 393,
    height: 852
  }
} as const;

const metrics = [
  { value: "6 недель", label: "от UX-логики до polished UI" },
  { value: "iOS + Android", label: "единый мобильный сценарий" },
  { value: "3 режима", label: "Description, Lyric, Image to song" },
  { value: "Prompt -> Track", label: "путь от идеи до результата" }
];

const tasks = [
  {
    number: "01",
    title: "Собрать guided flow",
    text: "Разбить создание трека на понятные решения: описание, настроение, жанр и дополнительные параметры."
  },
  {
    number: "02",
    title: "Снять страх пустого промпта",
    text: "Подсказки, чипы и готовые режимы помогают начать даже без опыта в продакшене."
  },
  {
    number: "03",
    title: "Объяснить ожидание AI",
    text: "Генерация не должна ощущаться зависанием: уведомления и статусы держат пользователя в контексте."
  },
  {
    number: "04",
    title: "Собрать библиотеку и плеер",
    text: "Готовые треки должны легко находиться, прослушиваться, сохраняться и возвращать к исходному промпту."
  }
];

const flowSteps = [
  {
    number: "01",
    kicker: "Старт",
    title: "Пользователь приходит в короткий музыкальный бриф.",
    text: "Первый экран держит фокус на описании будущего трека и сразу показывает решения, которые нужно принять дальше.",
    screen: screens.createDescription
  },
  {
    number: "02",
    kicker: "Промпт",
    title: "Идея превращается в точный запрос.",
    text: "Поле описания остаётся главным якорем, а настройки не перетягивают внимание до того, как сформулирована мысль.",
    screen: screens.createKeyboard
  },
  {
    number: "03",
    kicker: "Настройка",
    title: "Mood и genres дают контроль без перегруза.",
    text: "Пользователь может быстро выбрать эмоциональный вектор и жанр, не проваливаясь в интерфейс музыкального редактора.",
    screen: screens.createDescription
  },
  {
    number: "04",
    kicker: "Ожидание",
    title: "Ожидание AI становится понятным состоянием.",
    text: "Уведомления объясняют, что произойдёт дальше: пользователь может уйти из приложения и вернуться к готовому треку.",
    screen: screens.notification
  }
];

const libraryStep = {
  number: "05",
  kicker: "Библиотека",
  title: "Библиотека собирает треки, клипы и статусы в одном месте.",
  text: "Пустые состояния, generation in progress, список треков и промо-блоки работают как единая система, а не набор разрозненных экранов."
};

const playerStep = {
  number: "06",
  kicker: "Плеер",
  title: "Плеер сохраняет не только результат, но и контекст генерации.",
  text: "Обложка, контролы, лирика и исходный промпт остаются рядом с треком, чтобы пользователь мог повторить или улучшить результат.",
  screen: screens.playerCover
};

const libraryScreens = [
  screens.libraryEmpty,
  screens.libraryListShort,
  screens.libraryClipsGrid,
  screens.libraryEmptyOffer,
  screens.libraryClipsEmpty
];

const palette = [
  { color: "#0B0B0B", label: "Base black" },
  { color: "#2B2B2B", label: "Glass surface" },
  { color: "#FEC434", label: "AI glow" },
  { color: "#FE9511", label: "CTA orange" },
  { color: "#FDFDFD", label: "Clean white" }
];

const decisions = [
  {
    number: "01",
    title: "Создание трека как короткий сценарий",
    text: "Вместо сложного редактора пользователь проходит понятный бриф: описание, настроение и жанр."
  },
  {
    number: "02",
    title: "Три режима для разных стартовых точек",
    text: "Description, Lyric и Image to song закрывают разные способы мышления: от текста, строк или визуального настроения."
  },
  {
    number: "03",
    title: "Уведомления как часть AI-latency",
    text: "Когда генерация занимает время, интерфейс не бросает пользователя и объясняет, где появится результат."
  },
  {
    number: "04",
    title: "Плеер хранит авторский контекст",
    text: "Лирика и исходный промпт остаются рядом с треком, чтобы пользователь мог повторить, улучшить или объяснить результат."
  }
];

export function MusicGenCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <Header />
      <PageMotion musicgen />
      <main className="canvas-page musicgen-case">
        <Ruler />
        <article>
          <section className="musicgen-hero">
            <div className="musicgen-hero-copy">
              <div className="musicgen-label">AI Music / Mobile App / Product Design</div>
              <h1 className="musicgen-title letter-reveal">{caseStudy.title}</h1>
              <p className="musicgen-hero-text reveal-line">{caseStudy.summary}</p>
              <div className="musicgen-tags" aria-label="Project tags">
                {caseStudy.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="musicgen-hero-visual" aria-label="MusicGen AI mobile screens">
              <Image
                className="musicgen-hero-orb"
                src="/assets/images/musicgen/musicgen-sound-orb-3d.webp"
                alt=""
                width={1254}
                height={1254}
                priority
              />
              <DeviceFrame
                className="musicgen-device--hero-main"
                screen={screens.createDescription}
                priority
              />
              <DeviceFrame className="musicgen-device--hero-side" screen={screens.playerCover} />
              <Image
                className="musicgen-hero-ring"
                src="/assets/images/musicgen/musicgen-waveform-ring-3d.webp"
                alt=""
                width={1254}
                height={1254}
                priority
              />
            </div>
          </section>

          <section className="musicgen-metrics" aria-label="Project metrics">
            {metrics.map((metric) => (
              <div key={metric.value} className="musicgen-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </section>

          <section className="musicgen-about musicgen-section">
            <p className="musicgen-section-kicker">О проекте</p>
            <h2 className="musicgen-statement reveal-line">
              MusicGen AI превращает идею, текст или изображение в готовый трек без сложных
              продакшен-инструментов.
            </h2>
            <p className="musicgen-body">
              Мы собрали мобильный сценарий вокруг одного обещания: описать настроение, уточнить
              звук, дождаться генерации и вернуться к результату в библиотеке.
            </p>
          </section>

          <section className="musicgen-tasks musicgen-section">
            <div className="musicgen-section-heading">
              <p className="musicgen-section-kicker">Задачи</p>
              <h2>Что нужно было спроектировать</h2>
            </div>
            <div className="musicgen-task-grid">
              {tasks.map((task) => (
                <article key={task.number} className="musicgen-task-card">
                  <span>{task.number}</span>
                  <h3>{task.title}</h3>
                  <p>{task.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="musicgen-flow musicgen-section">
            <div className="musicgen-section-heading">
              <p className="musicgen-section-kicker">Как работает приложение</p>
              <h2>Как идея становится треком</h2>
            </div>

            <div className="musicgen-flow-layout">
              <div className="musicgen-flow-copy">
                {flowSteps.map((step, index) => (
                  <article
                    key={step.number}
                    className={`musicgen-flow-step ${index === 0 ? "is-active" : ""}`}
                    data-musicgen-step={index}
                  >
                    <div className="musicgen-step-meta">
                      <span>{step.number}/06</span>
                      <em>{step.kicker}</em>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <div className="musicgen-step-mobile-visual">
                      <DeviceFrame screen={step.screen} />
                    </div>
                  </article>
                ))}
              </div>

              <div className="musicgen-flow-sticky" aria-hidden="true">
                {flowSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`musicgen-flow-panel ${index === 0 ? "is-active" : ""}`}
                    data-musicgen-panel={index}
                  >
                    <DeviceFrame screen={step.screen} decorative />
                  </div>
                ))}
              </div>
            </div>

            <div className="musicgen-library-step">
              <div className="musicgen-step-meta">
                <span>{libraryStep.number}/06</span>
                <em>{libraryStep.kicker}</em>
              </div>
              <div className="musicgen-library-copy">
                <h3>{libraryStep.title}</h3>
                <p>{libraryStep.text}</p>
              </div>
              <div className="musicgen-library-showcase" aria-label="MusicGen AI library screens">
                {libraryScreens.map((screen, index) => (
                  <DeviceFrame
                    key={screen.src}
                    screen={screen}
                    className={`musicgen-library-device musicgen-library-device--${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="musicgen-player-step">
              <div className="musicgen-player-copy">
                <div className="musicgen-step-meta">
                  <span>{playerStep.number}/06</span>
                  <em>{playerStep.kicker}</em>
                </div>
                <h3>{playerStep.title}</h3>
                <p>{playerStep.text}</p>
              </div>
              <DeviceFrame screen={playerStep.screen} className="musicgen-player-device" />
            </div>
          </section>

          <section className="musicgen-system musicgen-section">
            <div className="musicgen-system-copy">
              <p className="musicgen-section-kicker">Визуальная система</p>
              <h2>Тёмная студия, тёплый AI-сигнал и понятные элементы управления.</h2>
              <p>
                Палитра держит продукт в ощущении ночной студии: почти чёрный фон, жёлтый glow
                вокруг генерации, оранжевые CTA и стеклянные поверхности для второстепенных
                состояний.
              </p>
            </div>
            <div className="musicgen-palette" aria-label="MusicGen color palette">
              {palette.map((item) => (
                <div
                  key={item.color}
                  className="musicgen-color"
                  style={{ "--swatch": item.color } as CSSProperties}
                >
                  <span>{item.color}</span>
                  <em>{item.label}</em>
                </div>
              ))}
            </div>
            <div className="musicgen-wave-card" aria-hidden="true">
              <i />
              {Array.from({ length: 48 }, (_, index) => (
                <span key={index} style={{ "--bar": (index % 9) + 1 } as CSSProperties} />
              ))}
            </div>
          </section>

          <section className="musicgen-decisions musicgen-section">
            <div className="musicgen-section-heading">
              <p className="musicgen-section-kicker">Дизайн-решения</p>
              <h2>Решения, которые держат продукт простым</h2>
            </div>
            <div className="musicgen-decision-grid">
              {decisions.map((decision) => (
                <article key={decision.number} className="musicgen-decision-card">
                  <span>{decision.number}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
            <div className="musicgen-decision-mockups">
              <DeviceFrame screen={screens.createDescription} />
              <DeviceFrame screen={screens.notification} />
              <DeviceFrame screen={screens.playerCover} />
            </div>
          </section>

          <section className="musicgen-result musicgen-section">
            <div className="musicgen-result-copy">
              <p className="musicgen-section-kicker">Результат</p>
              <h2>Получилась система, где AI-музыка ощущается управляемой.</h2>
              <p>
                Пользователь понимает, что ввести, какие параметры выбрать, где отслеживать
                генерацию и как вернуться к готовому треку. Для команды это база, которую можно
                расширять новыми моделями, режимами и форматами экспорта.
              </p>
              <Link href="/case-study" className="musicgen-back-link" data-cursor>
                Все кейсы
              </Link>
            </div>
            <div className="musicgen-result-visual" aria-label="MusicGen AI final product screens">
              <Image
                className="musicgen-result-ring"
                src="/assets/images/musicgen/musicgen-waveform-ring-3d.webp"
                alt=""
                width={1254}
                height={1254}
              />
              <div className="musicgen-result-devices">
                <DeviceFrame screen={screens.libraryListShort} />
                <DeviceFrame screen={screens.playerCover} />
              </div>
            </div>
          </section>
        </article>
        <CTA />
      </main>
      <CustomCursor />
    </>
  );
}

function DeviceFrame({
  screen,
  className,
  priority = false,
  decorative = false
}: {
  screen: (typeof screens)[keyof typeof screens];
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <figure className={`musicgen-device ${className ?? ""}`}>
      <div className="musicgen-device-shell" aria-hidden={decorative ? "true" : undefined}>
        <span className="musicgen-device-button musicgen-device-button--left" />
        <span className="musicgen-device-button musicgen-device-button--right" />
        <div className="musicgen-device-screen">
          <span className="musicgen-device-island" />
          <Image
            src={screen.src}
            alt={decorative ? "" : screen.alt}
            width={screen.width}
            height={screen.height}
            sizes="(max-width: 809px) 72vw, 320px"
            priority={priority}
          />
        </div>
      </div>
    </figure>
  );
}
