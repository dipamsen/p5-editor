import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import * as monaco from "monaco-editor";
import HTMLClosingTagProvider from "../providers/HTMLClosingTagProvider";
import JSColorProvider from "../providers/JSColorProvider";
import JSSnippetsProvider from "../providers/JSSnippetsProvider";
const p5TypeDefs = import.meta.glob("/node_modules/@types/p5/**/*.d.ts", {
  as: "raw",
  eager: true,
});

export default function registerProviders() {
  // Emmet
  emmetHTML(monaco);
  emmetCSS(monaco);

  // Closing Tag for HTML
  monaco.languages.registerCompletionItemProvider(
    "html",
    new HTMLClosingTagProvider()
  );

  // JavaScript Snippets
  monaco.languages.registerCompletionItemProvider(
    "javascript",
    new JSSnippetsProvider()
  );

  // Color Provider in JavaScript
  monaco.languages.registerColorProvider("javascript", new JSColorProvider());

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    allowJs: true,
    checkJs: true,
  });

  const files = Object.entries(p5TypeDefs).map(([path, module]) => {
    const name = path.replace("/node_modules/@types/p5/", "");
    return {
      name: `p5/${name}`,
      content: module,
    };
  });

  console.log(files);

  for (const file of files) {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      file.content,
      file.name
    );
    monaco.editor.createModel(
      file.content,
      "typescript",
      monaco.Uri.file(file.name)
    );
  }

  // const i = monaco.Uri.file("p5.instance.d.ts");
  // monaco.languages.typescript.javascriptDefaults.addExtraLib(
  //   CustomDef,
  //   i.toString()
  // );
  // const g = monaco.Uri.file("p5.global.d.ts");
  // monaco.languages.typescript.javascriptDefaults.addExtraLib(
  //   GlobalDef,
  //   g.toString()
  // );

  // @ts-ignore
  window.typings = {
    add(uri: string, name: string) {
      fetch(uri)
        .then((r) => r.text())
        .then((lib) => {
          const u = monaco.Uri.file(`${name}.d.ts`);
          monaco.languages.typescript.javascriptDefaults.addExtraLib(
            lib,
            u.toString()
          );
        });
    },
  };

  // // ESLint Code Action
  // editor.addAction({
  //   id: "lint-code",
  //   label: "Lint the Code",

  //   run(editor) {
  //     const l = new ESLint.Linter();

  //     const errors = l.verify(editor.getValue(), {});
  //     console.log(errors);
  //   },
  // });

  // // Prettier Code Action
  // editor.addAction({
  //   id: "format-code",
  //   label: "Format Code with Prettier",
  //   keybindings: [
  //     monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF,
  //   ],
  //   run() {
  //     editor.getAction("editor.action.formatDocument").run();
  //   },
  // });

  // // Prettier Code Formatter
  // monaco.languages.registerDocumentFormattingEditProvider("javascript", {
  //   provideDocumentFormattingEdits(model, options, token) {
  //     console.log("Formatting");
  //     const code = model.getValue();
  //     const result = Prettier.format(code, {
  //       parser: "babel",
  //       plugins: [Babel],
  //     });

  //     return [
  //       {
  //         range: model.getFullModelRange(),
  //         text: result,
  //       },
  //     ];
  //   },
  //   displayName: `Prettier ${Prettier.version}`,
  // });
}
