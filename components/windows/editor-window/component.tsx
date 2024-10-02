"use client";

import { Window } from "@/components/windows";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { EyeIcon } from "@/components/icons";
import "./styles.css";

export interface EditorWindowProps {
  onHeaderBtnClick: () => void;
  content: string;
}

const EditorWindow = forwardRef(function EditorWindow(
  { onHeaderBtnClick, content }: EditorWindowProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const [inpValue, setInpValue] = useState(content);

  useEffect(() => {
    setInpValue(content);
  }, [content]);

  return (
    <Window
      windowTitle="Markdown"
      windowClassName="editor-window"
      headerButton={<button onClick={onHeaderBtnClick}>{<EyeIcon />}</button>}
    >
      {!content ? (
        <div className="no-content">Loading document..</div>
      ) : (
        <textarea
          className="editor-textarea"
          ref={ref}
          value={inpValue}
          onChange={(e) => {
            setInpValue(e.target.value);
          }}
        ></textarea>
      )}
    </Window>
  );
});

export default EditorWindow;
