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
  intro: {
    src: "/assets/images/ai-trade/intro-screen.webp",
    alt: "Экран приветствия Chart AI — Find Winning Trades with a Photo",
    width: 393,
    height: 852
  },
  analysis: {
    src: "/assets/images/ai-trade/analysis-result.webp",
    alt: "Экран AI-анализа с Key Insights и Game Plan",
    width: 393,
    height: 852
  },
  market: {
    src: "/assets/images/ai-trade/onboarding-market.webp",
    alt: "Выбор рынка в onboarding",
    width: 393,
    height: 852
  },
  risk: {
    src: "/assets/images/ai-trade/onboarding-risk.webp",
    alt: "Выбор уровня риска",
    width: 393,
    height: 852
  },
  style: {
    src: "/assets/images/ai-trade/onboarding-style.webp",
    alt: "Выбор торгового стиля",
    width: 393,
    height: 852
  },
  depth: {
    src: "/assets/images/ai-trade/onboarding-depth.webp",
    alt: "Выбор глубины анализа",
    width: 393,
    height: 852
  },
  homeFull: {
    src: "/assets/images/ai-trade/home-full.webp",
    alt: "Главный экран с историей анализов",
    width: 393,
    height: 852
  },
  homeHistory: {
    src: "/assets/images/ai-trade/home-history.webp",
    alt: "Сетка недавних анализов",
    width: 393,
    height: 852
  },
  paywall: {
    src: "/assets/images/ai-trade/paywall.webp",
    alt: "Paywall с trial-подпиской",
    width: 393,
    height: 852
  },
  dataTrust: {
    src: "/assets/images/ai-trade/data-trust.webp",
    alt: "Экран доверия к данным AI",
    width: 393,
    height: 852
  },
  socialProof: {
    src: "/assets/images/ai-trade/social-proof.webp",
    alt: "Экран social proof с отзывами трейдеров",
    width: 393,
    height: 852
  },
  valueFaster: {
    src: "/assets/images/ai-trade/value-faster.webp",
    alt: "Сравнение скорости ручного анализа и AI-assisted workflow",
    width: 393,
    height: 852
  }
} as const;

const heroLead =
  "Сфотографировал график — через минуту понимаешь тренд, риски и конкретные уровни входа. Без таблиц и лишних экранов.";

const ecosystemCards = [
  {
    title: "Мобильное приложение",
    accent: "#41D8FE",
    text: "Загрузил фото графика — получил анализ и план. Основной сценарий для трейдера на ходу."
  },
  {
    title: "Персональный AI",
    accent: "#00D7B3",
    text: "Онбординг настраивает рынок, риск и стиль. AI учитывает профиль, а не даёт общие советы."
  },
  {
    title: "Возвращаемость",
    accent: "#B1F53C",
    text: "История анализов и подсказки удерживают в продукте. Premium объясняется в нужный момент."
  }
];

const splitSections = [
  {
    id: "onboarding",
    kicker: "Онбординг",
    title: "Четыре вопроса — и AI знает ваш контекст",
    text: "Рынок, риск, стиль и глубина анализа — каждый шаг на отдельном экране. Один выбор, без длинных форм и лишних полей.",
    screens: [screens.market, screens.risk],
    reverse: false
  },
  {
    id: "analysis",
    kicker: "Ключевая функция",
    title: "Из скриншота — понятный план",
    text: "Ключевые сигналы — тренд, волатильность, объём — собраны в блок Insights. Ниже — уровни входа, take profit и stop-loss на одном экране.",
    screens: [screens.analysis],
    reverse: true
  },
  {
    id: "dashboard",
    kicker: "Главный экран",
    title: "Всегда понятно, что делать дальше",
    text: "Подсказки, история прошлых анализов и блок подписки работают как единая система. Пользователь видит, где он был, и куда нажать снова.",
    screens: [screens.homeFull, screens.homeHistory],
    reverse: false
  },
  {
    id: "monetization",
    kicker: "Монетизация",
    title: "Подписка — часть сценария, не преграда",
    text: "Trial, отзывы и карточка upgrade объясняют ценность до оплаты. Paywall появляется там, где пользователь уже понял пользу продукта.",
    screens: [screens.paywall],
    reverse: true
  }
];

const palette = [
  { color: "#000000", label: "Terminal black" },
  { color: "#14141C", label: "Panel surface" },
  { color: "#00D7B3", label: "Bull signal" },
  { color: "#41D8FE", label: "Primary CTA" },
  { color: "#B1F53C", label: "Profit accent" }
];

const reviewMetrics = [
  { value: "4.9", label: "рейтинг App Store" },
  { value: "12k+", label: "активных трейдеров" },
  { value: "−40%", label: "времени на разбор" }
];

export function AiTradeCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <Header />
      <PageMotion aitrade />
      <main className="canvas-page aitrade-case">
        <Ruler />
        <article>
          <section className="aitrade-intro">
            <div className="aitrade-intro-bg" aria-hidden="true">
              <span className="aitrade-glow aitrade-glow--cyan" data-speed="0.06" />
              <span className="aitrade-glow aitrade-glow--green" data-speed="-0.04" />
            </div>

            <div className="aitrade-intro-copy aitrade-parallax" data-speed="-0.03">
              <p className="aitrade-eyebrow">Финтех · AI · мобильный продукт</p>
              <h1 className="aitrade-intro-title letter-reveal">{caseStudy.title}</h1>
              <p className="aitrade-intro-lead reveal-line">{heroLead}</p>
            </div>

            <div className="aitrade-intro-stage" aria-label="AI Trade hero composition">
              <p className="aitrade-stage-wordmark aitrade-parallax" data-speed="0.02" aria-hidden="true">
                CHART AI
              </p>
              <ScreenShot
                className="aitrade-stage-shot aitrade-stage-shot--left aitrade-parallax"
                dataSpeed="-0.1"
                screen={screens.market}
              />
              <ScreenShot
                className="aitrade-stage-hero aitrade-parallax"
                dataSpeed="0.12"
                screen={screens.intro}
                priority
              />
              <ScreenShot
                className="aitrade-stage-shot aitrade-stage-shot--right aitrade-parallax"
                dataSpeed="0.16"
                screen={screens.analysis}
              />
            </div>
          </section>

          <section className="aitrade-overview aitrade-block">
            <div className="aitrade-block-head aitrade-reveal">
              <h2>О проекте</h2>
              <p>
                Chart AI помогает трейдеру быстро разобраться в графике: загрузил скрин, получил
                структурированный разбор и план действий. Мы спроектировали путь от первого запуска
                до подписки — так, чтобы сложная аналитика ощущалась простой на телефоне.
              </p>
            </div>
            <div className="aitrade-ecosystem">
              {ecosystemCards.map((card) => (
                <article
                  key={card.title}
                  className="aitrade-ecosystem-card aitrade-reveal"
                  style={{ "--card-accent": card.accent } as CSSProperties}
                >
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="aitrade-look aitrade-block">
            <div className="aitrade-block-head aitrade-reveal">
              <h2>Как это выглядит</h2>
              <p>
                Главное обещание — анализ за минуту вместо двадцати. Экран наглядно сравнивает
                ручной разбор и путь с AI, без перегруза цифрами.
              </p>
            </div>
            <div className="aitrade-look-scene">
              <span className="aitrade-glow aitrade-glow--green aitrade-glow--look" data-speed="-0.05" />
              <ScreenShot
                className="aitrade-look-shot aitrade-parallax"
                dataSpeed="-0.05"
                screen={screens.valueFaster}
              />
            </div>
          </section>

          {splitSections.map((section) => (
            <section
              key={section.id}
              className={`aitrade-split aitrade-block ${section.reverse ? "aitrade-split--reverse" : ""}`}
            >
              <div className="aitrade-split-copy aitrade-reveal">
                <p className="aitrade-split-kicker">{section.kicker}</p>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
              <div className={`aitrade-split-visual aitrade-split-visual--${section.screens.length}`}>
                {section.screens.map((screen, index) => (
                  <ScreenShot
                    key={screen.src}
                    className={`aitrade-split-shot aitrade-split-shot--${index + 1} aitrade-parallax`}
                    dataSpeed={index % 2 === 0 ? "0.07" : "-0.05"}
                    screen={screen}
                  />
                ))}
              </div>
            </section>
          ))}

          <section className="aitrade-design aitrade-block">
            <div className="aitrade-block-head aitrade-reveal">
              <h2>Три состояния продукта</h2>
              <p>
                Онбординг, результат анализа и главный экран — три опорные точки, через которые
                проходит каждый пользователь. Собрали их в одну сцену, чтобы показать целостность
                интерфейса.
              </p>
            </div>
            <div className="aitrade-design-stage">
              <span className="aitrade-glow aitrade-glow--blue aitrade-glow--design" data-speed="0.05" />
              <ScreenShot
                className="aitrade-design-shot aitrade-design-shot--left aitrade-parallax"
                dataSpeed="-0.08"
                screen={screens.style}
              />
              <ScreenShot
                className="aitrade-design-shot aitrade-design-shot--center aitrade-parallax"
                dataSpeed="0.04"
                screen={screens.analysis}
              />
              <ScreenShot
                className="aitrade-design-shot aitrade-design-shot--right aitrade-parallax"
                dataSpeed="0.08"
                screen={screens.homeFull}
              />
            </div>
          </section>

          <section className="aitrade-colors aitrade-block">
            <div className="aitrade-block-head aitrade-reveal">
              <h2>Цвет и типографика</h2>
              <p>
                Тёмный terminal UI с неоновыми акцентами: чёрный фон, панели #14141C, зелёный для
                бычьих сигналов, голубой для действий. Шрифт — TT Neue.
              </p>
            </div>
            <div className="aitrade-palette aitrade-reveal">
              {palette.map((item) => (
                <div
                  key={item.color}
                  className="aitrade-swatch"
                  style={{ "--swatch": item.color } as CSSProperties}
                >
                  <span>{item.color}</span>
                  <em>{item.label}</em>
                </div>
              ))}
            </div>
          </section>

          <section className="aitrade-reviews aitrade-block">
            <div className="aitrade-reviews-split aitrade-split">
              <div className="aitrade-split-copy aitrade-reveal">
                <p className="aitrade-split-kicker">Social proof</p>
                <h2>Отзывы работают на конверсию</h2>
                <p>
                  Рейтинг и цифры встроены в paywall и онбординг — пользователь видит
                  доказательства до оплаты, а не в отдельном разделе приложения.
                </p>
                <div className="aitrade-reviews-metrics">
                  {reviewMetrics.map((metric) => (
                    <div key={metric.label} className="aitrade-reviews-metric">
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aitrade-reviews-visual aitrade-reveal">
                <ScreenShot
                  className="aitrade-reviews-shot aitrade-phone-shot aitrade-parallax"
                  dataSpeed="-0.08"
                  screen={screens.socialProof}
                />
              </div>
            </div>
          </section>

          <section className="aitrade-outro aitrade-block">
            <div className="aitrade-outro-copy aitrade-reveal">
              <h2>Результат</h2>
              <p>
                AI-анализ ощущается рабочим инструментом, а не игрушкой. За первые секунды понятна
                ценность, за пару шагов — персональный профиль, после загрузки графика — готовый
                план.
              </p>
              <Link href="/case-study" className="aitrade-back-link" data-cursor>
                ← Все кейсы
              </Link>
            </div>
            <ScreenShot
              className="aitrade-outro-shot aitrade-parallax"
              dataSpeed="0.05"
              screen={screens.dataTrust}
            />
          </section>
        </article>
        <CTA />
      </main>
      <CustomCursor />
    </>
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
      className={`aitrade-shot ${className ?? ""}`}
      {...(dataSpeed ? { "data-speed": dataSpeed } : {})}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={screen.width}
        height={screen.height}
        sizes="(max-width: 809px) 58vw, 300px"
        priority={priority}
      />
    </figure>
  );
}
