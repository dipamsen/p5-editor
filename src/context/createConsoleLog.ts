import { action } from "easy-peasy";
import { GlobalContext } from "./GlobalContext";
import { Log } from "../components/EditorWithPreview";

export const createConsoleLog = action<GlobalContext, Log>((state, log) => {
  state.consoleLogs.push(log);
});
