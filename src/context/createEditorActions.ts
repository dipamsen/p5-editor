import { thunk } from "easy-peasy";
import * as monaco from "monaco-editor";
import { Editor, GlobalContext } from "./GlobalContext";

export const createEditorActions = thunk<GlobalContext, Editor>(
  (actions, editor) => {
    editor.addAction({
      id: "start-sketch",
      label: "Start Sketch",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: actions.renderSketch,
    });

    editor.addAction({
      id: "stop-sketch",
      label: "Stop Sketch",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      ],
      run: actions.stopSketch,
    });

    editor.addAction({
      id: "save-code",
      label: "Save Code (no-op)",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => console.log("Saved Code"),
    });

    editor.addAction({
      id: "format-code",
      label: "Format Code with Prettier",
      keybindings: [
        monaco.KeyMod.Shift | monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
      ],
      run() {
        editor.getAction("editor.action.formatDocument")!.run();
      },
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      editor.trigger("", "editor.action.quickCommand", "");
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      editor.trigger("", "editor.action.quickCommand", "");
    });

    window.onresize = () => editor.layout();

    editor.trigger("", "vs.editor.ICodeEditor:1:start-sketch", "");
  }
);
