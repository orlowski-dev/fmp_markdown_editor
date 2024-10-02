"use client";

import { EyeCloseIcon, EyeIcon } from "@/components/icons";
import { Window } from "@/components/windows";
import "./styles.css";

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
        {content ? <div className="preview">{content}</div> : undefined}
      </div>
    </Window>
  );
};

export default PreviewWindow;
