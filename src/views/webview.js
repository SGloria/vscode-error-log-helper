const vscode = require("vscode");

module.exports = function generateWebViewContent(logText, translatedText, suggestions) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error Log Viewer</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        ul { list-style-type: disc; margin-left: 20px; }
      </style>
    </head>
    <body>
      <h1>Error Log Viewer</h1>
      <h2>Original Log</h2>
      <pre>${logText}</pre>
      <h2>Translated Log</h2>
      <pre>${translatedText}</pre>
      <h2>Suggestions</h2>
      <ul>
        ${suggestions.map((suggestion) => `<li>${suggestion}</li>`).join("")}
      </ul>
    </body>
    </html>
  `;
};
