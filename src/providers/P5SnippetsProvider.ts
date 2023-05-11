import * as monaco from "monaco-editor";

/** Provides p5.js function snippets */
export default class p5SnippetsProvider
  implements monaco.languages.CompletionItemProvider
{
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ) {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    const p5Events = [
      "preload",
      "setup",
      "draw",
      "mousePressed",
      "mouseReleased",
      "mouseClicked",
      "mouseMoved",
      "mouseDragged",
      "mouseOver",
      "mouseOut",
      "mouseWheel",
      "keyPressed",
      "keyTyped",
      "keyReleased",
    ];
    return {
      suggestions: p5Events.map((fn) => ({
        label: `function ${fn}`,
        kind: monaco.languages.CompletionItemKind.Snippet,
        range,
        insertText: `function ${fn}() {\n\t$0\n}`,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      })),
    };
  }
}
