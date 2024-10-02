"use client";

import {
  CloseIcon,
  Logo,
  MenuIcon,
  SaveIcon,
  TrashIcon,
} from "@/components/icons";
import "./styles.css";
import { FileRenamer } from "@/components/file-renamer";
import { Button } from "@/components/button";
import { MdDocument } from "@/data/types";

export interface AppHeaderProps {
  isSidebarVisible: boolean;
  currentDocument: MdDocument | undefined;
  existingDocsNames: string[];
  onValidFileName: (fileName: string) => void;
  onSaveBtnClick: () => void;
  onToggle: () => void;
  onRemoveBtnClick: () => void;
}

const AppHeader = ({
  isSidebarVisible,
  currentDocument,
  existingDocsNames,
  onValidFileName,
  onSaveBtnClick,
  onToggle,
  onRemoveBtnClick,
}: AppHeaderProps) => {
  return (
    <header className="app-header">
      <div className="left">
        <button className="sidebar-toggle-btn" onClick={onToggle}>
          {isSidebarVisible ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div className="logo">
          <Logo />
        </div>
        <div className="div separator"></div>
        {currentDocument ? (
          <FileRenamer
            onValidFileName={onValidFileName}
            invalidNames={existingDocsNames}
            defValue={currentDocument.name}
          />
        ) : undefined}
      </div>
      <div className="right">
        <Button
          variant="icon-only"
          color="dark"
          startIcon={<TrashIcon />}
          style={{ color: "var(--color-500)" }}
          title="Delete document"
          onClick={onRemoveBtnClick}
        >
          Remove document
        </Button>
        <Button
          variant="icon-only-mobile"
          startIcon={<SaveIcon />}
          onClick={onSaveBtnClick}
        >
          Save Changes
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
