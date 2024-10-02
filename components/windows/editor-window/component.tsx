"use client";

import { Window } from "@/components/windows";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { EyeIcon } from "@/components/icons";
import "./styles.css";

export interface EditorWindowProps {
  onHeaderBtnClick: () => void;
  defContent: string;
  onContentChange: (newContent: string) => void;
}

const EditorWindow = forwardRef(function EditorWindow(
  { onHeaderBtnClick, defContent, onContentChange }: EditorWindowProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const [inpValue, setInpValue] = useState(defContent);

  // when current document change, the defContent also change
  useEffect(() => {
    setInpValue(defContent);
  }, [defContent]);

  return (
    <Window
      windowTitle="Markdown"
      windowClassName="editor-window"
      headerButton={<button onClick={onHeaderBtnClick}>{<EyeIcon />}</button>}
    >
      <textarea
        className="editor-textarea"
        ref={ref}
        value={inpValue ?? ""}
        onChange={(e) => {
          setInpValue(e.target.value);
          onContentChange(e.target.value);
        }}
      ></textarea>
    </Window>
  );
});

export default EditorWindow;
