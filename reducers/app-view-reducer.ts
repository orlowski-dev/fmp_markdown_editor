import { MdDocument } from "@/data/types";

interface AppViewReducerStates {
  isSidebarVisible: boolean;
  previewOnly: boolean;
  documents: MdDocument[];
  currentDocument: MdDocument | undefined;
}

type BooleanTypeActions = {
  name: "setIsSidebarVisible" | "setPreviewOnly";
  payloadSet: boolean;
};

type MdCurrentDocumentAction = {
  name: "setCurrentDocument";
  payload: number | string;
};

type MdSetCurrentDocumentNameAction = {
  name: "setCurrentDocumentName";
  payload: string;
};

type MdDocumentsActions = {
  name: "setDocuments";
  payloadSet: MdDocument[];
};

type AppViewReducerActions =
  | BooleanTypeActions
  | MdDocumentsActions
  | MdCurrentDocumentAction
  | MdSetCurrentDocumentNameAction;

const appViewReducer = (
  states: AppViewReducerStates,
  action: AppViewReducerActions,
) => {
  switch (action.name) {
    case "setIsSidebarVisible":
      return { ...states, isSidebarVisible: action.payloadSet };
    case "setPreviewOnly":
      return { ...states, previewOnly: action.payloadSet };
    case "setDocuments":
      return { ...states, documents: action.payloadSet };
    case "setCurrentDocument":
      try {
        //find document by id
        const doc = states.documents.find(
          (elem) => elem.id === Number(action.payload),
        );
        if (!doc) {
          console.error("document with given id does not exist in the reducer");
          return states;
        }
        return { ...states, currentDocument: doc };
      } catch (err) {
        console.error(err);
        return states;
      }
    case "setCurrentDocumentName":
      if (!states.documents[0]) {
        throw new Error("Documenst array is empty");
      }
      if (!states.currentDocument) {
        throw new Error("Current document does not exist in the reducer");
      }

      if (states.currentDocument.name === action.payload) {
        console.log("file name did not changed");
        return states;
      }

      // update all docs
      const updatedDocs: MdDocument[] = states.documents.map((elem) => {
        if (elem.id === states.currentDocument!.id) {
          return { ...elem, name: action.payload };
        } else {
          return elem;
        }
      });

      return {
        ...states,
        documents: updatedDocs,
        currentDocument: { ...states.currentDocument, name: action.payload },
      };

    default:
      return states;
  }
};

export default appViewReducer;
