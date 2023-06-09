import * as monaco from "monaco-editor";
import { TEXT_FILE_REGEX } from "./FileUtils";

export default class File {
  private uri: monaco.Uri;
  model: monaco.editor.IModel;
  focused: boolean = false;
  blobUrl: string | undefined;
  constructor(content: string, language: string, name: string) {
    this.uri = monaco.Uri.file(name);
    if (this.editableAsText)
      this.model = monaco.editor.createModel(content, language, this.uri);
    else this.model = monaco.editor.createModel("", undefined, this.uri);
  }
  get path() {
    return this.uri.path;
  }
  get name() {
    return this.path.split("/").pop() as string;
  }
  get type() {
    const p = this.uri.fsPath;
    return p.endsWith("/") || p.endsWith("\\") ? "folder" : "file";
  }
  get extension() {
    return this.type == "file" ? this.path.split(".").pop() : null;
  }
  get editableAsText() {
    return TEXT_FILE_REGEX.test(this.path);
  }
  get content() {
    return this.model?.getValue();
  }
  toJSON() {
    return {
      name: this.name,
      path: this.path,
      content: this.content,
      isSelected: this.focused,
      blobUrl: this.blobUrl,
    };
  }
}
