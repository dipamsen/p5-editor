// https://github.com/processing/p5.js-web-editor/blob/develop/client/modules/Preview/EmbedFrame.jsx

// Console hook code:
// https://github.com/processing/p5.js-web-editor/blob/develop/client/utils/previewEntry.js

import { action } from "easy-peasy";
import {
  resolveLinksJS,
  resolveLinksCSS,
  resolveScripts,
  resolveStyles,
  resolveFileFromPath,
} from "../utils/CodeAnalysis";
import { MEDIA_FILE_REGEX } from "../utils/FileUtils";
import { consoleErrorScript } from "../utils/defaultFiles";
import { Editor, GlobalContext, PartialFile } from "./GlobalContext";

export const renderSketch = action<GlobalContext, Editor>((state) => {
  const htmlFile = state.files.find((file) =>
    file.name?.match(/.*\.html$/)
  )?.content;

  const resolvedFiles: PartialFile[] = [];

  // Replace all relative URL strings with Blob URL
  state.files.forEach((file) => {
    const newFile = file.toJSON();
    if (file.name.match(/.*\.js$/i)) {
      newFile.content = resolveLinksJS(newFile.content, state.files);
    } else if (file.name.match(/.*\.css$/i)) {
      newFile.content = resolveLinksCSS(newFile.content, state.files);
    }
    resolvedFiles.push(newFile);
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlFile!, "text/html");

  // Resolve Script Tags (sketch.js)
  resolveScripts(doc, state.files);
  // Resolve Link / Style Tags (style.css)
  resolveStyles(doc, state.files);

  // SRC and HREF Attributes to use Blob URL instead of relative
  ["src", "href"].forEach((attr) => {
    const allSrcElts = Array.from(doc.querySelectorAll(`[${attr}]`));
    allSrcElts.forEach((elt) => {
      const val = elt.getAttribute(attr);
      if (val && val.match(MEDIA_FILE_REGEX)) {
        const resFile = resolveFileFromPath(val, resolvedFiles);
        if (resFile && resFile.blobUrl) {
          elt.setAttribute(attr, resFile.blobUrl);
        }
      }
    });
  });

  // Add Scripts to Catch console error
  const consoleScriptTag = doc.createElement("script");
  consoleScriptTag.innerHTML = consoleErrorScript;
  doc.head.insertBefore(consoleScriptTag, doc.head.firstChild);

  // Final Processed HTML
  const htmlToRender = `<!DOCTYPE HTML>\n${doc.documentElement.outerHTML}`;

  if (!state.iframe) return;
  state.iframe.srcdoc = htmlToRender;
  state.consoleLogs.length = 0;
});
