import { PartialFile } from "../context/GlobalContext";
import File from "./FileManager";
import {
  STRING_REGEX,
  MEDIA_FILE_QUOTED_REGEX,
  NOT_EXTERNAL_LINK_REGEX,
  PLAINTEXT_FILE_REGEX,
} from "./FileUtils";

export function resolveLinksJS(content: string, files: File[]) {
  const strings = content.match(STRING_REGEX) || [];
  strings.forEach((str) => {
    if (str.match(MEDIA_FILE_QUOTED_REGEX)) {
      // Media File String Found
      // (local media file)
      const filePath = str.slice(1, -1); // remove quotes
      const quoteChar = str[0];
      const file = resolveFileFromPath(filePath, files);
      if (file) {
        const newStr = quoteChar + file.blobUrl + quoteChar;
        content = content.replace(str, newStr);
      }
    }
  });
  return content;
}
export function resolveLinksCSS(content: string, files: File[]) {
  const strings = content.match(STRING_REGEX) || [];
  strings.forEach((str) => {
    if (str.match(MEDIA_FILE_QUOTED_REGEX)) {
      // Media File String Found
      // (local media file)
      const filePath = str.slice(1, -1); // remove quotes
      const quoteChar = str[0];
      const file = resolveFileFromPath(filePath, files);
      if (file) {
        const newStr = quoteChar + file.blobUrl + quoteChar;
        content = content.replace(str, newStr);
      }
    }
  });
  return content;
}
export function resolveScripts(doc: Document, files: File[]) {
  const scriptTags = Array.from(doc.getElementsByTagName("script"));
  scriptTags.forEach((script) => {
    const src = script.getAttribute("src");
    if (src && src.match(NOT_EXTERNAL_LINK_REGEX) !== null) {
      const resolvedFile = resolveFileFromPath(src, files);
      if (resolvedFile) {
        script.setAttribute("data-tag", resolvedFile.name);
        script.removeAttribute("src");
        script.innerHTML = resolvedFile.content;
      }
    } else {
      script.setAttribute("crossorigin", "");
      script.innerHTML = resolveLinksJS(script.innerHTML, files);
    }
  });
}
export function resolveStyles(doc: Document, files: File[]) {
  const inlineCSSInHTML = Array.from(doc.getElementsByTagName("style"));
  inlineCSSInHTML.forEach((style) => {
    style.innerHTML = resolveLinksCSS(style.innerHTML, files);
  });

  const cssLinksInHTML = Array.from(
    doc.querySelectorAll('link[rel="stylesheet"]')
  );
  cssLinksInHTML.forEach((css) => {
    const href = css.getAttribute("href");
    if (href && href.match(NOT_EXTERNAL_LINK_REGEX) !== null) {
      const resolvedFile = resolveFileFromPath(href, files);
      if (resolvedFile) {
        const style = doc.createElement("style");
        style.innerHTML = `\n${resolvedFile.content}`;
        doc.head.appendChild(style);
        css.parentElement!.removeChild(css);
      }
    }
  });
}
export function resolveFileFromPath(
  path: string,
  allFiles: (PartialFile | File)[]
): PartialFile | undefined {
  const file = allFiles.find((f) => f.name == path.split("/").pop());
  if (file) {
    if (file.blobUrl && !file.name.match(PLAINTEXT_FILE_REGEX)) return file;
    URL.revokeObjectURL(file.blobUrl || "");
    const fileBlob = new Blob([file.content]);
    const blobUrl = URL.createObjectURL(fileBlob);
    file.blobUrl = blobUrl;
    return file;
  }
  return undefined;
}
