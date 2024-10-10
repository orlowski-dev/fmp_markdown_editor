"use client";

import "./styles.css";

export interface NoDocSectionProps {
  title: string;
  description: string;
}

const NoDocSection = ({ title, description }: NoDocSectionProps) => {
  return (
    <section className="no-doc-section">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
};

export default NoDocSection;
