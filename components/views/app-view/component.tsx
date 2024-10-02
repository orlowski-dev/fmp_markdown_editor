"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { EditorWindow, PreviewWindow } from "@/components/windows";
import { appViewReducer } from "@/reducers";
import { useLocalStorage } from "@/hooks";
import { welcomeDocs } from "@/data/def-data";
import { useSearchParams } from "next/navigation";
import "./styles.css";

const AppView = () => {
  const spDocId = useSearchParams().get("doc");
  const [states, dispatch] = useReducer(appViewReducer, {
    isSidebarVisible: false,
    previewOnly: false,
    documents: [],
    currentDocument: undefined,
  });
  const editorContentRef = useRef<HTMLTextAreaElement>(null);
  const mainWrapperRef = useRef<HTMLDivElement>(null);
  const { value } = useLocalStorage("docs", welcomeDocs);

  // set states.document on localStorage load
  useEffect(() => {
    dispatch({ name: "setDocuments", payloadSet: value });
  }, [states.documents, value]);

  // set current document
  useEffect(() => {
    if (!spDocId) return;
    dispatch({ name: "setCurrentDocument", payloadSetId: spDocId });
  }, [spDocId]);

  // set current document when no searchparams were provided
  useEffect(() => {
    if (value && !spDocId) {
      dispatch({ name: "setCurrentDocument", payloadSetId: 0 });
    }
  }, [spDocId, value]);

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
      <Sidebar docs={states.documents} onLinkClick={toggleSidebarCallback} />
      <div className="content">
        <AppHeader
          currentDocument={states.currentDocument}
          onToggle={toggleSidebarCallback}
          onValidFileName={() => {}}
          isSidebarVisible={states.isSidebarVisible}
        />
        {states.currentDocument ? (
          <div className="main-wrapper" ref={mainWrapperRef}>
            <EditorWindow
              ref={editorContentRef}
              content={states.currentDocument.content}
              onHeaderBtnClick={addClassPreviewOnly}
            />
            <div className="separator"></div>
            <PreviewWindow
              onHeaderBtnClick={() => {
                if (states.previewOnly) removeClassPreviewOnly();
                else addClassPreviewOnly();
              }}
              buttonEvent={
                states.previewOnly ? "close-preview" : "only-preview"
              }
            />
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default AppView;
