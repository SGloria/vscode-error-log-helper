const vscode = require("vscode");
const TranslationService = require("../services/translation");
const WebViewController = require("./webViewController");
const config = require("../config/config");

class PluginController {
  constructor() {
    this.translationService = new TranslationService(config.getApiKey());
    this.webViewController = new WebViewController();
  }

  listenToOutput() {
    const outputChannel = vscode.window.createOutputChannel("Error Logs");
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      const logText = event.document.getText();

      try {
        const result = await this.translationService.translateAndSuggest(logText);
        if (this.webViewController) {
          this.webViewController.updateWebView({ logText }, result);
        } else {
          vscode.window.showErrorMessage("WebViewController is not initialized.");
        }
      } catch (error) {
        vscode.window.showErrorMessage("Error processing log: " + error.message);
      }
    });
  }
}

module.exports = PluginController;
