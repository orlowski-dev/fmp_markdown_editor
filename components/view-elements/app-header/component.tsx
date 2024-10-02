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
  onToggle: () => void;
  currentDocument: MdDocument | undefined;
  onValidFileName: (fileName: string) => void;
  onSaveBtnClick: () => void;
}

const AppHeader = ({
  isSidebarVisible,
  onToggle,
  currentDocument,
  onValidFileName,
  onSaveBtnClick,
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
