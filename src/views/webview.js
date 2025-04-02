const vscode = require("vscode");

class WebViewController {
  constructor() {
    this.panel = null;
  }

  openWebView() {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel("errorLogWebView", "Error Log Viewer", vscode.ViewColumn.One, {
        enableScripts: true,
      });
    }
  }

  updateWebView(log, suggestions) {
    if (!this.panel) {
      this.openWebView();
    }

    const suggestionList = suggestions.map((s) => `<li>${s}</li>`).join("");
    this.panel.webview.html = `
            <html>
                <body>
                    <h2>Translated Error Log</h2>
                    <pre>${log.translatedText || "Translation not available"}</pre>
                    <h2>Fix Suggestions</h2>
                    <ul>${suggestionList}</ul>
                </body>
            </html>
        `;
  }

  closeWebView() {
    if (this.panel) {
      this.panel.dispose();
      this.panel = null;
    }
  }
}

module.exports = WebViewController;
