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
import { MdDocument } from "@/data/types";

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
  const { isReady, value, setValue } = useLocalStorage("docs", welcomeDocs);

  // ! this ref keeps track of the last value of states.documents to avoiding calling setValue if the value has not changed
  // this prevent unnecessary useEffect run and avoid the loop
  const lastDocumentsRef = useRef<MdDocument[] | undefined>(undefined);

  useEffect(() => {
    // set states.document on localStorage load
    if (isReady && !lastDocumentsRef.current) {
      dispatch({ name: "setDocuments", payloadSet: value });
      lastDocumentsRef.current = states.documents;
      return;
    }

    // update localStorage on states.documents change
    if (
      isReady &&
      lastDocumentsRef.current &&
      lastDocumentsRef.current !== states.documents
    ) {
      setValue(states.documents);
      lastDocumentsRef.current = states.documents;
    }
  }, [states.documents, value, isReady, setValue]);

  // set current document
  useEffect(() => {
    if (isReady && spDocId) {
      dispatch({ name: "setCurrentDocument", payload: spDocId });
      return;
    }
    if (isReady && !spDocId && value) {
      dispatch({ name: "setCurrentDocument", payload: 0 });
    }
  }, [spDocId, isReady, value]);

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

  const onFileNameChange = useCallback(
    (fileName: string) => {
      dispatch({ name: "setCurrentDocumentName", payload: fileName });
    },
    [dispatch],
  );

  return (
    <div className={`app-view ${states.isSidebarVisible ? "sv" : "si"} `}>
      <Sidebar docs={states.documents} onLinkClick={toggleSidebarCallback} />
      <div className="content">
        <AppHeader
          currentDocument={states.currentDocument}
          onToggle={toggleSidebarCallback}
          onValidFileName={onFileNameChange}
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
