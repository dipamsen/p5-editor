import { action } from "easy-peasy";
import { GlobalContext } from "./GlobalContext";
import File from "../utils/FileManager";
import * as monaco from "monaco-editor";
export const createEditor = action<GlobalContext>((state, domElement) => {
  if (state.editor) return;
  state.editor = monaco.editor.create(domElement, {
    theme: "vs-dark",
    tabSize: 2,
    insertSpaces: true,
    fontSize: 20,
    "semanticHighlighting.enabled": true,
  });
  state.editor?.setModel(state.files[0].model);
});
