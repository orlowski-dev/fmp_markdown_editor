import { MdDocument } from "@/data/types";

interface AppViewReducerStates {
  isSidebarVisible: boolean;
  previewOnly: boolean;
  documents: MdDocument[];
}

type BooleanTypeActions = {
  name: "setIsSidebarVisible" | "setPreviewOnly";
  payloadSet: boolean;
};

type MdDocumentsActions = {
  name: "setDocuments";
  payloadSet: MdDocument[];
};

type AppViewReducerActions = BooleanTypeActions | MdDocumentsActions;

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
    default:
      return states;
  }
};

export default appViewReducer;
