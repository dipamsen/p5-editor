import { useEffect, useRef } from "react";
import styles from "./Editor.module.css";
import * as monaco from "monaco-editor";
import File from "../utils/FileManager";
import { useStoreActions, useStoreState } from "easy-peasy";
import { GlobalContext } from "../context/GlobalContext";

export const Editor = ({ files }: { files: File[] }) => {
  const editor = useStoreState<
    GlobalContext,
    monaco.editor.IStandaloneCodeEditor | null
  >((state) => state.editor);
  const createEditor = useStoreActions<GlobalContext>(
    (actions) => actions.createEditor
  );
  const initEditor = useStoreActions<GlobalContext>(
    (actions) => actions.createEditorActions
  );

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    setTimeout(() => {
      createEditor(ref.current);
    }, 100);
    return () => {
      if (editor) editor.dispose();
    };
  }, [ref]);

  useEffect(() => {
    if (!editor) return;
    initEditor(editor);
  }, [editor]);
  return <div className={styles.Editor} id="editor" ref={ref}></div>;
};
