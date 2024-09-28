"use client";

import { EyeCloseIcon, EyeIcon } from "@/components/icons";
import { Window } from "@/components/windows";
import "./styles.css";

export interface PreviewWindowProps {
  onHeaderBtnClick: () => void;
  buttonEvent: "only-preview" | "close-preview";
}

const PreviewWindow = ({
  onHeaderBtnClick,
  buttonEvent,
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
        <div className="preview">this is preview</div>
      </div>
    </Window>
  );
};

export default PreviewWindow;
