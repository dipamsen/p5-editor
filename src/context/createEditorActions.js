import { thunk } from "easy-peasy";
import * as monaco from "monaco-editor";
export const createEditorActions = thunk((actions, editor) => {
    editor.addAction({
        id: "run-code",
        label: "Run Code",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
        run: actions.renderSketch,
    });
    editor.addAction({
        id: "save-code",
        label: "Save Code (no-op)",
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: () => console.log("Saved Code"),
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
        editor.trigger("", "editor.action.quickCommand", "");
    });
    editor.trigger("", "vs.editor.ICodeEditor:1:run-code", "");
});
