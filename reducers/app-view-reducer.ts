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

type MdCurrentDocumentActions = {
  name: "setCurrentDocument";
  payloadSetId: number | string;
};

type MdDocumentsActions = {
  name: "setDocuments";
  payloadSet: MdDocument[];
};

type AppViewReducerActions =
  | BooleanTypeActions
  | MdDocumentsActions
  | MdCurrentDocumentActions;

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
          (elem) => elem.id === Number(action.payloadSetId),
        );
        if (!doc) {
          console.error("document with given id does not exist in the reducer");
          return states;
        }
        return { ...states, currentDocument: doc };
      } catch {
        console.error("cannot parse an id.");
        return states;
      }
    default:
      return states;
  }
};

export default appViewReducer;
