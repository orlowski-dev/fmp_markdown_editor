"use client";

import { EyeIcon } from "@/components/icons";
import { Window } from "@/components/windows";
import "./styles.css";

export interface PreviewWindowProps {
  onHeaderBtnClick: () => void;
}

const PreviewWindow = ({ onHeaderBtnClick }: PreviewWindowProps) => {
  return (
    <Window
      windowTitle="Preview"
      windowClassName="preview-window"
      headerButton={<button onClick={onHeaderBtnClick}>{<EyeIcon />}</button>}
    >
      <div className="preview-wrapper">
        <div className="preview">this is preview</div>
      </div>
    </Window>
  );
};

export default PreviewWindow;
