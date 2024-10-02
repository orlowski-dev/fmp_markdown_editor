"use client";

import { Sidebar } from "@/components/view-elements/sidebar";
import { AppHeader } from "@/components/view-elements";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { EditorWindow, PreviewWindow } from "@/components/windows";
import { appViewReducer } from "@/reducers";
import { useLocalStorage } from "@/hooks";
import { welcomeDocs } from "@/data/def-data";
import { useSearchParams } from "next/navigation";
import { MdDocument } from "@/data/types";
import "./styles.css";

const AppView = () => {
  const spDocId = useSearchParams().get("doc");
  const [states, dispatch] = useReducer(appViewReducer, {
    isSidebarVisible: false,
    previewOnly: false,
    documents: [],
    currentDocument: undefined,
    currentDocumentTempContent: undefined,
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
      dispatch({ name: "setDocuments", payload: value });
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
      dispatch({ name: "setCurrentDocument", payload: Number(spDocId) });
      return;
    }
    if (isReady && !spDocId && value) {
      dispatch({ name: "setCurrentDocument", payload: 0 });
    }
  }, [spDocId, isReady, value]);

  const toggleSidebarCallback = useCallback(() => {
    dispatch({
      name: "setIsSidebarVisible",
      payload: !states.isSidebarVisible,
    });
  }, [states.isSidebarVisible]);

  const addClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.add("only-preview");
    dispatch({ name: "setPreviewOnly", payload: true });
  };

  const removeClassPreviewOnly = () => {
    if (!mainWrapperRef.current) return;

    mainWrapperRef.current.classList.remove("only-preview");
    dispatch({ name: "setPreviewOnly", payload: false });
  };

  const handleOnFileNameChange = useCallback(
    (fileName: string) => {
      dispatch({ name: "setCurrentDocumentName", payload: fileName });
    },
    [dispatch],
  );

  const handleOnEditorContentChange = useCallback(
    (newContent: string) => {
      dispatch({ name: "setDocumentTempContent", payload: newContent });
    },
    [dispatch],
  );

  const handleOnSaveBtnClick = useCallback(() => {
    dispatch({ name: "saveDocumentTempContent" });
  }, [dispatch]);

  const handleOnNewDocumentClick = useCallback(() => {
    dispatch({ name: "createNewDocument", payload: "New document.md" });
  }, [dispatch]);

  return (
    <div className={`app-view ${states.isSidebarVisible ? "sv" : "si"} `}>
      <Sidebar
        docs={states.documents}
        onLinkClick={toggleSidebarCallback}
        onNewDocumentClick={handleOnNewDocumentClick}
      />
      <div className="content">
        <AppHeader
          currentDocument={states.currentDocument}
          isSidebarVisible={states.isSidebarVisible}
          existingDocsNames={states.documents.map((doc) => doc.name)}
          onToggle={toggleSidebarCallback}
          onValidFileName={handleOnFileNameChange}
          onSaveBtnClick={handleOnSaveBtnClick}
        />
        {states.currentDocument ? (
          <div className="main-wrapper" ref={mainWrapperRef}>
            <EditorWindow
              ref={editorContentRef}
              defContent={states.currentDocument.content}
              onContentChange={handleOnEditorContentChange}
              onHeaderBtnClick={addClassPreviewOnly}
            />
            <div className="separator"></div>
            <PreviewWindow
              content={states.currentDocumentTempContent}
              onHeaderBtnClick={() => {
                if (states.previewOnly) removeClassPreviewOnly();
                else addClassPreviewOnly();
              }}
              buttonEvent={
                states.previewOnly ? "close-preview" : "only-preview"
              }
            />
          </div>
        ) : (
          <div>Document not found!</div>
        )}
      </div>
    </div>
  );
};

export default AppView;
