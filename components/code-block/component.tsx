"use client";

import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import "./github.css";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CodeBlock = ({ children, ...rest }: CodeBlockProps) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagRef.current) return;

    if (tagRef.current && tagRef.current.dataset.highlighted) {
      delete tagRef.current.dataset.highlighted;
      tagRef.current.removeAttribute("data-highlighted");
      tagRef.current.removeAttribute("node");
      return;
    }

    const blockClassNameLang = tagRef.current.className.split("-")[1];
    const supportedLangs = hljs.listLanguages();

    if (supportedLangs.indexOf(blockClassNameLang) != -1) {
      hljs.highlightElement(tagRef.current);
    } else {
      tagRef.current.className = "language-xml hljs";
      hljs.highlightElement(tagRef.current);
    }
  }, []);
  return (
    <code {...rest} ref={tagRef}>
      {children}
    </code>
  );
};

export default CodeBlock;
