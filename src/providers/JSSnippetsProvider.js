import * as monaco from "monaco-editor";
/** Provides common JS code Snippets like `for`, `if` and `switch`. */
export default class SnippetsProvider {
    provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
        };
        return {
            suggestions: snippets.map(({ prefix, body, description }) => ({
                label: prefix,
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: description,
                insertText: body.join("\n"),
                range,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            })),
        };
    }
}
const snippets = [
    {
        prefix: "for",
        body: [
            "for (let ${1:index} = 0; ${1:index} < ${2:array}.length; ${1:index}++) {",
            "\tconst ${3:element} = ${2:array}[${1:index}];",
            "\t$0",
            "}",
        ],
        description: "For Loop",
    },
    {
        prefix: "foreach",
        body: ["${1:array}.forEach(${2:element} => {", "\t$0", "});"],
        description: "For-Each Loop",
    },
    {
        prefix: "forin",
        body: [
            "for (const ${1:key} in ${2:object}) {",
            "\tif (Object.hasOwnProperty.call(${2:object}, ${1:key})) {",
            "\t\tconst ${3:element} = ${2:object}[${1:key}];",
            "\t\t$0",
            "\t}",
            "}",
        ],
        description: "For-In Loop",
    },
    {
        prefix: "forof",
        body: ["for (const ${1:iterator} of ${2:object}) {", "\t$0", "}"],
        description: "For-Of Loop",
    },
    {
        prefix: "function",
        body: ["function ${1:name}(${2:params}) {", "\t$0", "}"],
        description: "Function Statement",
    },
    {
        prefix: "if",
        body: ["if (${1:condition}) {", "\t$0", "}"],
        description: "If Statement",
    },
    {
        prefix: "ifelse",
        body: ["if (${1:condition}) {", "\t$0", "} else {", "\t", "}"],
        description: "If-Else Statement",
    },
    {
        prefix: "new",
        body: ["const ${1:name} = new ${2:type}(${3:arguments});$0"],
        description: "New Statement",
    },
    {
        prefix: "switch",
        body: [
            "switch (${1:key}) {",
            "\tcase ${2:value}:",
            "\t\t$0",
            "\t\tbreak;",
            "",
            "\tdefault:",
            "\t\tbreak;",
            "}",
        ],
        description: "Switch Statement",
    },
    {
        prefix: "while",
        body: ["while (${1:condition}) {", "\t$0", "}"],
        description: "While Statement",
    },
    {
        prefix: "dowhile",
        body: ["do {", "\t$0", "} while (${1:condition});"],
        description: "Do-While Statement",
    },
    {
        prefix: "trycatch",
        body: ["try {", "\t$0", "} catch (${1:error}) {", "\t", "}"],
        description: "Try-Catch Statement",
    },
    {
        prefix: "settimeout",
        body: ["setTimeout(() => {", "\t$0", "}, ${1:timeout});"],
        description: "Set Timeout Function",
    },
    {
        prefix: "setinterval",
        body: ["setInterval(() => {", "\t$0", "}, ${1:interval});"],
        description: "Set Interval Function",
    },
    {
        prefix: "log",
        body: ["console.log($1);"],
        description: "Log to the console",
    },
    {
        prefix: "warn",
        body: ["console.warn($1);"],
        description: "Log warning to the console",
    },
    {
        prefix: "error",
        body: ["console.error($1);"],
        description: "Log error to the console",
    },
];
