import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import EditorWithPreview, { Log } from "./components/EditorWithPreview";
import Header from "./components/Header";
import "./styles.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import registerProviders from "./utils/registerProviders";
import { defaultFiles } from "./utils/defaultFiles";
import File from "./utils/FileManager";
import { GlobalContext } from "./context/GlobalContext";

registerProviders();

export default function App() {
  const initialiseEditor = useStoreActions<GlobalContext>(
    (actions) => actions.initialiseEditor
  );
  const iframe = useStoreState<GlobalContext>((state) => state.iframe);
  const createConsoleLog = useStoreActions<GlobalContext>(
    (actions) => actions.createConsoleLog
  );

  useEffect(() => {
    initialiseEditor();
    if (!iframe) return;
    const listener = (ev: MessageEvent) => {
      if (ev.source == iframe?.contentWindow) {
        const log: Log = {
          data: ev.data,
          id: Date.now().toString(),
          method: "log",
        };
        createConsoleLog(log);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [iframe]);

  return (
    <main>
      <Header />
      <EditorWithPreview />
    </main>
  );
}
