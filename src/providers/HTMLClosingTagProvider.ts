import * as monaco from "monaco-editor";

/** Provides auto completion of HTML closing tags. */
export default class HTMLClosingTagProvider
  implements monaco.languages.CompletionItemProvider
{
  triggerCharacters = [">"];
  provideCompletionItems(
    model: monaco.editor.ITextModel,
    position: monaco.Position
  ) {
    const codePre: string = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });
    const tag = codePre.match(/.*<(\w+)>$/)?.[1];
    if (!tag) return { suggestions: [] };
    const word = model.getWordUntilPosition(position);
    return {
      suggestions: [
        {
          label: `</${tag}>`,
          kind: monaco.languages.CompletionItemKind.EnumMember,
          insertText: `</${tag}>`,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          },
        },
      ],
    };
  }
}
