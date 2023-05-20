import { createStore, action, type Action, Thunk } from "easy-peasy";
import File from "../utils/FileManager";
import * as monaco from "monaco-editor";
import { initialiseEditor } from "./initialiseEditor";
import { createEditor } from "./createEditor";
import { createEditorActions } from "./createEditorActions";
import { renderSketch } from "./renderSketch";
import { Log } from "../components/EditorWithPreview";
import { createConsoleLog } from "./createConsoleLog";
import { hookConsole } from "./hookConsole";
import { stopSketch } from "./stopSketch";

export type Editor = monaco.editor.IStandaloneCodeEditor;
export interface GlobalContext {
  files: File[];
  initialiseEditor: Action<GlobalContext>;
  createEditor: Action<GlobalContext, HTMLElement>;
  editor: Editor | null;
  renderSketch: Action<GlobalContext, Editor>;
  iframe: HTMLIFrameElement | null;
  setIframe: Action<GlobalContext, HTMLIFrameElement>;
  createEditorActions: Thunk<GlobalContext, Editor>;
  consoleLogs: Log[];
  createConsoleLog: Action<GlobalContext, Log>;
  hookConsole: Thunk<GlobalContext, HTMLIFrameElement>;
  stopSketch: Action<GlobalContext, Editor>;
}

export interface PartialFile {
  name: string;
  path: string;
  content: string;
  blobUrl: string | undefined;
}

export const globalContext = createStore<GlobalContext>({
  files: [],
  initialiseEditor,
  editor: null,
  createEditor,
  createEditorActions,
  iframe: null,
  setIframe: action((state, iframe) => {
    state.iframe = iframe;
  }),
  renderSketch,
  consoleLogs: [],
  createConsoleLog,
  hookConsole,
  stopSketch,
});
