import { createStore, action } from "easy-peasy";
import { initialiseEditor } from "./initialiseEditor";
import { createEditor } from "./createEditor";
import { createEditorActions } from "./createEditorActions";
import { renderSketch } from "./renderSketch";
import { createConsoleLog } from "./createConsoleLog";
export const globalContext = createStore({
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
