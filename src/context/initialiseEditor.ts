import { action } from "easy-peasy";
import { defaultFiles } from "../utils/defaultFiles";
import { GlobalContext } from "./GlobalContext";
import File from "../utils/FileManager";

export const initialiseEditor = action<GlobalContext>((state) => {
  if (state.files.length > 0) return;
  defaultFiles.forEach((file) => {
    const model = new File(file.code, file.language, file.name);
    state.files.push(model);
  });
});
