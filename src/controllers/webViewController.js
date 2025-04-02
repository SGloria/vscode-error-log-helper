const vscode = require("vscode");
const generateWebViewContent = require("../views/webview");

class WebViewController {
  constructor() {
    this.panel = null;
  }

  openWebView() {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel("errorLogHelper", "Error Log Helper", vscode.ViewColumn.One, {
        enableScripts: true,
      });

      // 修复未正确初始化的 onDidDispose
      this.panel.onDidDispose(() => {
        this.panel = null;
      });
    }
  }

  closeWebView() {
    if (this.panel) {
      this.panel.dispose();
      this.panel = null;
    }
  }

  updateContent(logText, translatedText, suggestions) {
    if (!this.panel) {
      this.openWebView();
    }

    // 调用 generateWebViewContent 生成 HTML
    this.panel.webview.html = generateWebViewContent(logText, translatedText, suggestions);
  }
}

module.exports = WebViewController;
