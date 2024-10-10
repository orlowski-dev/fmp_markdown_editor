"use client";

import { EyeCloseIcon, EyeIcon } from "@/components/icons";
import { Window } from "@/components/windows";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./styles.css";
import { CodeBlock } from "@/components/code-block";

export interface PreviewWindowProps {
  onHeaderBtnClick: () => void;
  buttonEvent: "only-preview" | "close-preview";
  content: string | undefined;
}

const PreviewWindow = ({
  onHeaderBtnClick,
  buttonEvent,
  content,
}: PreviewWindowProps) => {
  return (
    <Window
      windowTitle="Preview"
      windowClassName="preview-window"
      headerButton={
        <button onClick={onHeaderBtnClick}>
          {buttonEvent === "only-preview" ? <EyeIcon /> : <EyeCloseIcon />}
        </button>
      }
    >
      <div className="preview-wrapper">
        {content ? (
          <div className="preview">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;

                  return (
                    <CodeBlock {...rest} className={className}>
                      {children}
                    </CodeBlock>
                  );
                },
              }}
            >
              {content}
            </Markdown>
          </div>
        ) : undefined}
      </div>
    </Window>
  );
};

export default PreviewWindow;
