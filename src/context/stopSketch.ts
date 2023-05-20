import { GlobalContext } from "./GlobalContext";
import { action } from "easy-peasy";

export const stopSketch = action<GlobalContext>((state) => {
  if (!state.iframe) return;
  state.iframe.srcdoc = "";
});
