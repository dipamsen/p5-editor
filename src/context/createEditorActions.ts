import { thunk } from "easy-peasy";
import * as monaco from "monaco-editor";
import { Editor, GlobalContext } from "./GlobalContext";
import { removeContextMenuGroup } from "../utils/removeContextMenuGroup";

export const createEditorActions = thunk<GlobalContext, Editor>(
  (actions, editor) => {
    // Remove the navigation group from the context menu (Go to Definition, etc.)
    removeContextMenuGroup("navigation");

    console.log(editor.getSupportedActions().map((x) => x.id));

    editor.addAction({
      id: "start-sketch",
      label: "Start Sketch",
      contextMenuGroupId: "0_global",
      contextMenuOrder: 1,
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: actions.renderSketch,
    });

    editor.addAction({
      id: "stop-sketch",
      label: "Stop Sketch",
      contextMenuGroupId: "0_global",
      contextMenuOrder: 2,
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

    // change keybindings for format document and command palette
    monaco.editor.addKeybindingRules([
      {
        command: "editor.action.formatDocument",
        keybinding:
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
      },
      {
        command: "editor.action.quickCommand",
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
      },
    ]);

    // resize the editor when the window resizes
    window.onresize = () => editor.layout();

    // run the sketch when the editor is ready
    editor.trigger("editor", "start-sketch", {});
  }
);
