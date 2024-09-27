"use client";

import { FileIcon } from "@/components/icons";
import { useRef, useState } from "react";
import "./styles.css";

export interface FileRenamerProps {
  defValue: string;
  onValidFileName: (fileName: string) => void;
}

const FileRenamer = ({ defValue, onValidFileName }: FileRenamerProps) => {
  const [isInputValid, setIsInputValid] = useState(true);
  const inpRef = useRef<HTMLInputElement>(null);

  const checkIsInputValid = (value: string) => {
    if (!RegExp("^[a-zA-Z0-9][a-zA-Z0-9 _-]{0,30}.md$").test(value)) {
      setIsInputValid(false);
      return;
    }

    setIsInputValid(true);
  };

  return (
    <div className="file-renamer">
      <span className="icon">
        <FileIcon />
      </span>
      <div className="input-area">
        <label htmlFor="file-rename">Document name</label>
        <input
          type="text"
          id="file-rename"
          ref={inpRef}
          className={!isInputValid ? "invalid" : "valid"}
          defaultValue={defValue}
          onBlur={(e) => {
            if (isInputValid) onValidFileName(e.target.value);
          }}
          onChange={(e) => checkIsInputValid(e.target.value)}
          onKeyUp={(e) => {
            if (!inpRef.current) return;
            if (e.key == "Enter") {
              if (!isInputValid) return;
              onValidFileName(inpRef.current.value);
              inpRef.current.blur();
            }
          }}
        />
      </div>
    </div>
  );
};

export default FileRenamer;
