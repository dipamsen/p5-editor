import { thunk } from "easy-peasy";
import { GlobalContext } from "./GlobalContext";
import { Log } from "../components/EditorWithPreview";

export const hookConsole = thunk<GlobalContext, HTMLIFrameElement>(
  (actions, iframe) => {
    const listener = (ev: MessageEvent) => {
      if (ev.source == iframe?.contentWindow) {
        const log: Log = {
          data: ev.data,
          id: Date.now().toString(),
          method: "log",
        };
        console.log(ev);
        actions.createConsoleLog(log);
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }
);
