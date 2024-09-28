"use client";

import "./styles.css";

export interface WindowProps {
  windowTitle: string;
  windowClassName: string;
  children: React.ReactNode;
  headerButton?: React.ReactElement<HTMLButtonElement>;
}

const Window = ({
  windowTitle,
  windowClassName,
  children,
  headerButton,
}: WindowProps) => {
  return (
    <section className={`window ${windowClassName}`}>
      <header>
        <h2>{windowTitle}</h2>
        {headerButton ?? undefined}
      </header>
      {children}
    </section>
  );
};

export default Window;
