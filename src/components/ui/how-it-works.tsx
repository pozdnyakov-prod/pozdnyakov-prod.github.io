// How It Works (21st.dev). Карточки, кнопка-булавка, цвета, линованный фон
// и бегущий пунктир из промта. Изменено: раскладка по горизонтали
// (слева направо зигзагом), а не сверху вниз; на узких экранах карточки
// идут стопкой, как в мобильной версии промта.
import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  decoration?: React.ReactNode;
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className,
  rotate,
  decoration,
}: CardProps) => {
  const bgColors = {
    orange: "bg-orange-50",
    blue: "bg-blue-50",
    purple: "bg-purple-50",
  };
  const textColors = {
    orange: "text-orange-500",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };
  const borderColors = {
    orange: "border-orange-100",
    blue: "border-blue-100",
    purple: "border-purple-100",
  };

  return (
    <div
      className={`relative w-full sm:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      {decoration}
      <div className="bg-white p-2 rounded-[25px] shadow-[0px_10px_20px_0px_#D3D3D3] border border-neutral-100">
        <Pin className={`w-8 h-8 ${textColors[colorTheme]} z-20 mb-6 mx-auto`} />
        <div
          className={`${bgColors[colorTheme]} border ${borderColors[colorTheme]} rounded-[15px] p-[15px] h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`${textColors[colorTheme]} text-4xl mb-5`}
            style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}
          >
            {number}
          </span>
          <h3 className="text-2xl font-semibold text-neutral-800 leading-none mb-[10px]">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm/5 tracking-tight">{description}</p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  decoration?: React.ReactNode;
}

// Горизонтальный зигзаг: доли ширины контейнера и отступ сверху в px
const POSITIONS = [
  { left: "0%", top: 0, rotate: "rotate-8" },
  { left: "25%", top: 190, rotate: "-rotate-8" },
  { left: "50%", top: 0, rotate: "rotate-8" },
  { left: "75%", top: 190, rotate: "-rotate-8" },
];
const HEIGHT = 500;

export default function HowItWorks({ features }: { features: Step[] }) {
  // Пунктир проходит за карточками через их середины (viewBox 1000 × HEIGHT)
  const pathD = "M 125 150 C 230 150, 270 340, 375 340 S 520 150, 625 150 S 770 340, 875 340";

  return (
    <LazyMotion features={domAnimation}>
      <div className="bg-white max-xl:pt-10 max-xl:pb-16 xl:py-20 px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        ></div>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>

        <div className="max-w-[1320px] mx-auto relative z-10">
          <div
            className="relative w-full grid gap-12 sm:grid-cols-2 sm:justify-items-center xl:block xl:h-[var(--xl-height)]"
            style={{ "--xl-height": `${HEIGHT}px` } as React.CSSProperties}
          >
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none hidden xl:block z-0"
              viewBox={`0 0 1000 ${HEIGHT}`}
              preserveAspectRatio="none"
            >
              <m.path
                d={pathD}
                stroke="currentColor"
                className="text-neutral-300"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -140 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {features.map((step, index) => {
              const pos = POSITIONS[index % POSITIONS.length];
              return (
                <div
                  key={step.title}
                  className="xl:absolute xl:w-[25%] flex justify-center"
                  style={{ left: pos.left, top: pos.top } as React.CSSProperties}
                >
                  <Card
                    number={`0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    colorTheme={step.colorTheme || "blue"}
                    rotate={pos.rotate}
                    decoration={step.decoration}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
