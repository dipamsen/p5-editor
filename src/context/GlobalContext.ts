import { createStore, action, type Action, Thunk, thunk } from "easy-peasy";
import File from "../utils/FileManager";
import { consoleErrorScript, defaultFiles } from "../utils/defaultFiles";
import * as monaco from "monaco-editor";
import {
  resolveLinksJS,
  resolveLinksCSS,
  resolveScripts,
  resolveStyles,
  resolveFileFromPath,
} from "../utils/CodeAnalysis";
import { MEDIA_FILE_REGEX } from "../utils/FileUtils";
import { initialiseEditor } from "./initialiseEditor";
import { createEditor } from "./createEditor";
import { createEditorActions } from "./createEditorActions";
import { renderSketch } from "./renderSketch";
import { Log } from "../components/EditorWithPreview";
import { createConsoleLog } from "./createConsoleLog";

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
});
