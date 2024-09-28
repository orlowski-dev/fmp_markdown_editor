"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useRef, useState } from "react";
import { EditorWindow, PreviewWindow } from "@/components/windows";
import "./styles.css";

const AppView = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [previewOnly, setPreviewOnly] = useState(false);
  const editorContentRef = useRef<HTMLTextAreaElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  const toggleSidebarCallback = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  const addClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.add("only-preview");
    setPreviewOnly(true);
  };

  const removeClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.remove("only-preview");
    setPreviewOnly(false);
  };

  return (
    <div className={`app-view ${isSidebarVisible ? "sv" : "si"} `}>
      <Sidebar />
      <div className="content">
        <AppHeader
          onToggle={toggleSidebarCallback}
          isSidebarVisible={isSidebarVisible}
        />
        <div className="main-wrapper" ref={mainWrapperRef}>
          <EditorWindow
            ref={editorContentRef}
            onHeaderBtnClick={addClassPreviewOnly}
          />
          <div className="separator"></div>
          <PreviewWindow
            onHeaderBtnClick={() => {
              if (previewOnly) removeClassPreviewOnly();
              else addClassPreviewOnly();
            }}
            buttonEvent={previewOnly ? "close-preview" : "only-preview"}
          />
        </div>
      </div>
    </div>
  );
};

export default AppView;
