import { MdDocument } from "@/data/types";

interface AppViewReducerStates {
  isSidebarVisible: boolean;
  previewOnly: boolean;
  documents: MdDocument[];
  currentDocument: MdDocument | undefined;
  currentDocumentTempContent: string | undefined;
}

type BooleanTypeActions = {
  name: "setIsSidebarVisible" | "setPreviewOnly";
  payload: boolean;
};

type NumberActions = {
  name: "setCurrentDocument";
  payload: number;
};

type StringActions = {
  name: "setCurrentDocumentName" | "setDocumentTempContent";
  payload: string;
};

type ActionsWithoutPayload = {
  name: "saveDocumentTempContent";
};

type MdDocumentsActions = {
  name: "setDocuments";
  payload: MdDocument[];
};

type AppViewReducerActions =
  | BooleanTypeActions
  | MdDocumentsActions
  | NumberActions
  | StringActions
  | ActionsWithoutPayload;

const appViewReducer = (
  states: AppViewReducerStates,
  action: AppViewReducerActions,
) => {
  switch (action.name) {
    case "setIsSidebarVisible":
      return { ...states, isSidebarVisible: action.payload };
    case "setPreviewOnly":
      return { ...states, previewOnly: action.payload };
    case "setDocuments":
      return { ...states, documents: action.payload };
    case "setCurrentDocument":
      if (isNaN(action.payload)) {
        console.error("invalid document id");
        return states;
      }
      //find document by id
      const doc = states.documents.find((elem) => elem.id === action.payload);
      if (!doc) {
        console.error("document with given id does not exist in the reducer");
        return states;
      }
      return {
        ...states,
        currentDocument: doc,
        currentDocumentTempContent: doc.content,
      };

    case "setCurrentDocumentName":
      if (!states.currentDocument) {
        throw new Error("Current document does not exist in the reducer");
      }

      if (states.currentDocument.name === action.payload) {
        console.log("file name did not changed");
        return states;
      }

      return {
        ...states,
        documents: updateArray(
          states.documents,
          { elemKey: "id", value: states.currentDocument.id },
          { elemKey: "name", value: action.payload },
        ),
        currentDocument: { ...states.currentDocument, name: action.payload },
      };

    case "setDocumentTempContent":
      return { ...states, currentDocumentTempContent: action.payload };

    case "saveDocumentTempContent":
      if (!states.currentDocument) {
        throw new Error("Current document is undefined!");
      }

      if (states.currentDocument.content === action.payload) {
        console.log("Document content did not change");
        return states;
      }

      return {
        ...states,
        documents: updateArray(
          states.documents,
          { elemKey: "id", value: states.currentDocument.id },
          { elemKey: "content", value: states.currentDocumentTempContent },
        ),
      };

    default:
      return states;
  }
};

type KeyOf<T> = keyof T;

function updateArray<Arr extends object, CompareValue, NewValue>(
  arr: Arr[],
  toCompare: { elemKey: KeyOf<Arr>; value: CompareValue },
  toChange: { elemKey: KeyOf<Arr>; value: NewValue },
): Arr[] {
  if (!arr[0]) {
    throw new Error("Array is empty. Cannot update.");
  }

  return arr.map((elem) => {
    if (elem[toCompare.elemKey] === toCompare.value) {
      return { ...elem, [toChange.elemKey]: toChange.value };
    }
    return elem;
  });
}

export default appViewReducer;
