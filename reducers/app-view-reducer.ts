import { MdDocument } from "@/data/types";

interface AppViewReducerStates {
  isSidebarVisible: boolean;
  previewOnly: boolean;
  documents: MdDocument[];
  currentDocument: MdDocument | undefined;
  currentDocumentTempContent: string | undefined;
  isModalVisible: boolean;
}

type BooleanTypeActions = {
  name:
    | "setIsSidebarVisible"
    | "setPreviewOnly"
    | "setIsModalVisible"
    | "removeDocument";
  payload: boolean;
};

type NumberActions = {
  name: "setCurrentDocument";
  payload: number;
};

type StringActions = {
  name:
    | "setCurrentDocumentName"
    | "setDocumentTempContent"
    | "createNewDocument";
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

function sortDocs(arr: MdDocument[]): MdDocument[] {
  if (!arr[0]) {
    return arr;
  }

  return arr.sort((a, b) => {
    return b.id - a.id;
  });
}

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
      return { ...states, documents: sortDocs(action.payload) };
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

      return {
        ...states,
        documents: updateArray(
          states.documents,
          { elemKey: "id", value: states.currentDocument.id },
          { elemKey: "content", value: states.currentDocumentTempContent },
        ),
      };

    case "createNewDocument":
      const date = new Date();
      const today = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

      if (states.documents.length == 0) {
        const newDoc: MdDocument = {
          id: 0,
          name: action.payload,
          createdAt: today,
          content: "",
        };
        return { ...states, documents: [newDoc] };
      }

      // check if document with given name already exists
      const nameWithoutExt = action.payload.split(".")[0];

      const docsWithTheSameName = states.documents.filter((doc) =>
        doc.name.startsWith(nameWithoutExt),
      );

      const docName =
        docsWithTheSameName.length > 0
          ? `${nameWithoutExt} (${docsWithTheSameName.length}).md`
          : action.payload;

      const lastId = states.documents.reduce(
        (max, elem) => (elem.id > max ? elem.id : max),
        0,
      );

      const newDoc: MdDocument = {
        id: lastId + 1,
        name: docName,
        createdAt: today,
        content: "",
      };

      const updatedDocs = [newDoc, ...states.documents];

      return { ...states, documents: updatedDocs };

    case "setIsModalVisible":
      return { ...states, isModalVisible: action.payload };

    case "removeDocument":
      // payload controls modal visibility => as `closeModal`, if payload is `true` then isModalVisible will be false

      if (!states.currentDocument) {
        throw new Error("Current document does not exist in the reducer");
      }

      return {
        ...states,
        documents: states.documents.filter(
          (doc) => doc.id !== states.currentDocument!.id,
        ),
        isModalVisible: !action.payload,
        currentDocument: undefined,
      };

    default:
      return states;
  }
};

export default appViewReducer;
