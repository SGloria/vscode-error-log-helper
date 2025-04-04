const vscode = require("vscode");

class ViewManager {
  constructor() {
    this.panel = null;
  }

  createPanel() {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel("errorTranslation", "错误翻译", vscode.ViewColumn.Two, {
      enableScripts: true,
    });

    this.panel.onDidDispose(() => {
      this.panel = null;
    });
  }

  showTranslation(original, translated) {
    this.createPanel();
    this.panel.webview.html = this.getWebviewContent(original, translated);
  }

  getWebviewContent(original, translated) {
    return `
            <!DOCTYPE html>
            <html>
            <body>
                <h3>原始错误:</h3>
                <pre>${original}</pre>
                <h3>翻译解释:</h3>
                <p>${translated}</p>
            </body>
            </html>
        `;
  }

  dispose() {
    if (this.panel) {
      this.panel.dispose();
      this.panel = null;
    }
  }
}

module.exports = ViewManager;
