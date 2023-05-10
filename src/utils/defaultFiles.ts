export const defaultFiles = [
  {
    name: "sketch.js",
    language: "javascript",
    code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`,
  },
  {
    name: "index.html",
    language: "html",
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
    </main>
    <script src="sketch.js"></script>
  </body>
</html>
`,
  },
  {
    name: "style.css",
    language: "css",
    code: `html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
`,
  },
];

export const consoleErrorScript = `
var nativeConsoleLog = console.log
console.log = function log(...args) {
  parent.postMessage(args)
  nativeConsoleLog.call(null, ...args)
}
const err = function () {
  nativeConsoleLog(arguments)
  parent.postMessage([...arguments].map(JSON.stringify))
  return false;
};
onerror = err
window.addEventListener("error", err)

onunhandledrejection = err
`;
