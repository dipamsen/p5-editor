import { Editor } from "./Editor";
import Preview from "./Preview";
import styles from "./EditorWithPreview.module.css";
import { ComponentProps, useEffect, useRef, useState } from "react";
import File from "../utils/FileManager";
import { State, useStoreState } from "easy-peasy";
import { GlobalContext } from "../context/GlobalContext";
import { Console } from "console-feed";

export type Log = ComponentProps<typeof Console>["logs"][0];

export default function EditorWithPreview() {
  const files = useStoreState((state: State<GlobalContext>) => state.files);
  const editor = useStoreState((state: State<GlobalContext>) => state.editor);
  const [selectedFile, setSelectedFile] = useState<File | null>(files[0]);
  const logs = useStoreState(
    (state: State<GlobalContext>) => state.consoleLogs
  );
  const objDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (objDiv.current) objDiv.current.scrollTop = objDiv.current?.scrollHeight;
  }, [logs]);

  useEffect(() => {
    setSelectedFile(files[0]);
  }, [files]);

  useEffect(() => {
    if (selectedFile) {
      editor?.setModel(selectedFile.model);
    }
  }, [selectedFile]);

  return (
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <div className={styles.tabs}>
          {files.map((f) => (
            <div
              key={f.model.uri.path}
              className={[
                styles.tab,
                selectedFile?.model.uri.path == f.model.uri.path
                  ? styles.active
                  : styles.inactive,
              ].join(" ")}
              onClick={() => {
                setSelectedFile(f);
              }}
            >
              {f.name}
            </div>
          ))}
        </div>
        <Editor />
        <div className={styles.consoleContainer}>
          <p className={styles.consoleHeader}>Console</p>
          <div className={styles.scrollable} ref={objDiv}>
            <Console
              variant="dark"
              logs={logs}
              styles={{
                BASE_FONT_SIZE: "16px",
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.previewContainer}>
        <Preview />
      </div>
    </div>
  );
}
