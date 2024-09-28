"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useRef, useState } from "react";
import { EditorWindow, PreviewWindow } from "@/components/windows";
import "./styles.css";

const AppView = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const editorContentRef = useRef<HTMLTextAreaElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);

  const toggleSidebarCallback = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  const onEditorBntClick = () => {};

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
            onHeaderBtnClick={onEditorBntClick}
          />
          <div className="separator"></div>
          <PreviewWindow />
        </div>
      </div>
    </div>
  );
};

export default AppView;
