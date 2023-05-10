"use strict";
// class OutputFrame {
//   isPlaying: boolean = false;
//   private iframe: HTMLIFrameElement;
//   private files: File[];
//   constructor(files: File[]) {
//     this.iframe = iFrameElt;
//     this.files = files;
//   }
//   // Modified From
//   // https://github.com/processing/p5.js-web-editor/blob/develop/client/modules/IDE/components/PreviewFrame.jsx
//   renderSketch() {
//     const frame = this.iframe;
//     console.log(this.files);
//     // Find the first HTML File
//     const htmlFile = this.files.find((val) =>
//       val.name.match(/.*\.html$/)
//     ).content;
//     const resolvedFiles: {
//       name: string;
//       path: string;
//       content: string;
//       isSelected: boolean;
//       blobUrl: string;
//     }[] = [];
//     // Replace all relative URL strings with Blob URL
//     this.files.forEach((file) => {
//       const newFile = file.toJSON();
//       if (file.name.match(/.*\.js$/i)) {
//         newFile.content = this.resolveLinksJS(newFile.content);
//       } else if (file.name.match(/.*\.css$/i)) {
//         newFile.content = this.resolveLinksCSS(newFile.content);
//       }
//       resolvedFiles.push(newFile);
//     });
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlFile, "text/html");
//     // Resolve Script Tags (sketch.js)
//     this.resolveScripts(doc);
//     // Resolve Link / Style Tags (style.css)
//     this.resolveStyles(doc);
//     // SRC and HREF Attributes to use Blob URL instead of relative
//     ["src", "href"].forEach((attr) => {
//       const allSrcElts = Array.from(doc.querySelectorAll(`[${attr}]`));
//       allSrcElts.forEach((elt) => {
//         if (elt.getAttribute(attr).match(MEDIA_FILE_REGEX)) {
//           const resFile = this.resolveFileFromPath(
//             elt.getAttribute(attr),
//             resolvedFiles
//           );
//           if (resFile && resFile.blobUrl) {
//             elt.setAttribute(attr, resFile.blobUrl);
//           }
//         }
//       });
//     });
//     // Add Scripts to Catch console error
//     const consoleScriptTag = doc.createElement("script");
//     consoleScriptTag.innerHTML = consoleErrorScript;
//     doc.head.insertBefore(consoleScriptTag, doc.head.firstChild);
//     // Final Processed HTML
//     const htmlToRender = `<!DOCTYPE HTML>\n${doc.documentElement.outerHTML}`;
//     // Set IFrame to HTML
//     if (this.isPlaying) {
//       // ! Clear Console
//     }
//     frame.srcdoc = htmlToRender;
//   }
//   stop() {
//     this.iframe.srcdoc = "";
//   }
//   resolveLinksJS(content: string) {
//     const strings = content.match(STRING_REGEX) || [];
//     strings.forEach((str) => {
//       if (str.match(MEDIA_FILE_QUOTED_REGEX)) {
//         // Media File String Found
//         // (local media file)
//         const filePath = str.slice(1, -1); // remove quotes
//         const quoteChar = str[0];
//         const file = this.resolveFileFromPath(filePath);
//         if (file) {
//           const newStr = quoteChar + file.blobUrl + quoteChar;
//           content = content.replace(str, newStr);
//         }
//       }
//     });
//     return content;
//   }
//   resolveLinksCSS(content: string) {
//     const strings = content.match(STRING_REGEX) || [];
//     strings.forEach((str) => {
//       if (str.match(MEDIA_FILE_QUOTED_REGEX)) {
//         // Media File String Found
//         // (local media file)
//         const filePath = str.slice(1, -1); // remove quotes
//         const quoteChar = str[0];
//         const file = this.resolveFileFromPath(filePath);
//         if (file) {
//           const newStr = quoteChar + file.blobUrl + quoteChar;
//           content = content.replace(str, newStr);
//         }
//       }
//     });
//     return content;
//   }
//   resolveScripts(doc: Document) {
//     const scriptTags = Array.from(doc.getElementsByTagName("script"));
//     scriptTags.forEach((script) => {
//       if (
//         script.getAttribute("src") &&
//         script.getAttribute("src").match(NOT_EXTERNAL_LINK_REGEX) !== null
//       ) {
//         const resolvedFile = this.resolveFileFromPath(
//           script.getAttribute("src")
//         );
//         if (resolvedFile) {
//           script.setAttribute("data-tag", resolvedFile.name);
//           script.removeAttribute("src");
//           script.innerHTML = resolvedFile.content;
//         }
//       } else {
//         script.setAttribute("crossorigin", "");
//         script.innerHTML = this.resolveLinksJS(script.innerHTML);
//       }
//     });
//   }
//   resolveStyles(doc: Document) {
//     const inlineCSSInHTML = Array.from(doc.getElementsByTagName("style"));
//     inlineCSSInHTML.forEach((style) => {
//       style.innerHTML = this.resolveLinksCSS(style.innerHTML);
//     });
//     const cssLinksInHTML = Array.from(
//       doc.querySelectorAll('link[rel="stylesheet"]')
//     );
//     cssLinksInHTML.forEach((css) => {
//       if (
//         css.getAttribute("href") &&
//         css.getAttribute("href").match(NOT_EXTERNAL_LINK_REGEX) !== null
//       ) {
//         const resolvedFile = this.resolveFileFromPath(css.getAttribute("href"));
//         if (resolvedFile) {
//           const style = doc.createElement("style");
//           style.innerHTML = `\n${resolvedFile.content}`;
//           doc.head.appendChild(style);
//           css.parentElement.removeChild(css);
//         }
//       }
//     });
//   }
//   resolveFileFromPath(path: string, allFiles: Partial<File>[] = this.files) {
//     const file = allFiles.find((f) => f.name == path.split("/").pop());
//     if (file) {
//       if (file.blobUrl && !file.name.match(PLAINTEXT_FILE_REGEX)) return file;
//       URL.revokeObjectURL(file.blobUrl);
//       const fileBlob = file.fileBlob || new Blob([file.content]);
//       const blobUrl = URL.createObjectURL(fileBlob);
//       file.blobUrl = blobUrl;
//       return file;
//     }
//     return undefined;
//   }
// }
// export default OutputFrame;
