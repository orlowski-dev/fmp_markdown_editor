"use client";

import { FileIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

export interface FileRenamerProps {
  defValue: string;
  invalidNames: string[];
  onValidFileName: (fileName: string) => void;
}

const FileRenamer = ({
  defValue,
  onValidFileName,
  invalidNames,
}: FileRenamerProps) => {
  const [isInputValid, setIsInputValid] = useState(true);
  const inpRef = useRef<HTMLInputElement>(null);
  const [inpValue, setInpValue] = useState(defValue);

  useEffect(() => {
    setInpValue(defValue);
  }, [defValue]);

  const checkIsInputValid = (value: string) => {
    const validName = RegExp("^[a-zA-Z0-9][a-zA-Z0-9 _-]{0,30}.md$").test(
      value,
    );
    const uniqueName = !invalidNames.includes(value);
    const valid = validName && uniqueName;
    setIsInputValid(valid);
    return valid;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInpValue(e.target.value);
    checkIsInputValid(e.target.value);
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
          value={inpValue}
          onBlur={(e) => {
            if (checkIsInputValid(e.target.value)) {
              onValidFileName(e.target.value);
            }
          }}
          onChange={handleOnChange}
          onKeyUp={(e) => {
            if (!inpRef.current) return;
            if (e.key == "Enter") {
              inpRef.current.blur();
            }
          }}
        />
      </div>
    </div>
  );
};

export default FileRenamer;
