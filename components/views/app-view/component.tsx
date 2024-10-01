"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { EditorWindow, PreviewWindow } from "@/components/windows";
import { appViewReducer } from "@/reducers";
import { useLocalStorage } from "@/hooks";
import { welcomeDocs } from "@/data/def-data";
import "./styles.css";

const AppView = () => {
  const [states, dispatch] = useReducer(appViewReducer, {
    isSidebarVisible: false,
    previewOnly: false,
    documents: [],
  });
  const editorContentRef = useRef<HTMLTextAreaElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const { value } = useLocalStorage("docs", welcomeDocs);

  // set states.document on localStorage load
  useEffect(() => {
    if (states.documents.length > 0) return;
    dispatch({ name: "setDocuments", payloadSet: value });
  }, [states.documents, value]);

  const toggleSidebarCallback = useCallback(() => {
    dispatch({
      name: "setIsSidebarVisible",
      payloadSet: !states.isSidebarVisible,
    });
  }, [states.isSidebarVisible]);

  const addClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.add("only-preview");
    dispatch({ name: "setPreviewOnly", payloadSet: true });
  };

  const removeClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.remove("only-preview");
    dispatch({ name: "setPreviewOnly", payloadSet: false });
  };

  return (
    <div className={`app-view ${states.isSidebarVisible ? "sv" : "si"} `}>
      <Sidebar docs={states.documents} />
      <div className="content">
        <AppHeader
          onToggle={toggleSidebarCallback}
          isSidebarVisible={states.isSidebarVisible}
        />
        <div className="main-wrapper" ref={mainWrapperRef}>
          <EditorWindow
            ref={editorContentRef}
            onHeaderBtnClick={addClassPreviewOnly}
          />
          <div className="separator"></div>
          <PreviewWindow
            onHeaderBtnClick={() => {
              if (states.previewOnly) removeClassPreviewOnly();
              else addClassPreviewOnly();
            }}
            buttonEvent={states.previewOnly ? "close-preview" : "only-preview"}
          />
        </div>
      </div>
    </div>
  );
};

export default AppView;
