const vscode = require("vscode");

class WebViewController {
  constructor() {
    this.panel = null;
  }

  createOrShowWebView() {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel("errorLogHelper", "Error Log Helper", vscode.ViewColumn.One, {
        enableScripts: true,
      });
    }
  }

  updateWebView(errorLog, suggestions) {
    this.createOrShowWebView();
    const content = `
      <html>
        <body>
          <h1>Error Log</h1>
          <pre>${errorLog.logText}</pre>
          ${errorLog.translatedText ? `<h2>Translated Text</h2><pre>${errorLog.translatedText}</pre>` : ""}
          <h2>Suggestions</h2>
          <ul>
            ${suggestions.map((suggestion) => `<li>${suggestion}</li>`).join("")}
          </ul>
        </body>
      </html>
    `;
    this.panel.webview.html = content;
  }
}

module.exports = WebViewController;
