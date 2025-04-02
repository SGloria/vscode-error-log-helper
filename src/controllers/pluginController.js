const vscode = require("vscode");
const TranslationService = require("../services/translation");
const FixRecommendationService = require("../services/fixService");
const WebViewController = require("./webViewController");
const config = require("../config/config");

class PluginController {
  constructor() {
    this.translationService = new TranslationService(config.getApiKey());
    this.fixRecommendationService = new FixRecommendationService();
    this.webViewController = new WebViewController();
  }

  listenToOutput() {
    const outputChannel = vscode.window.createOutputChannel("Error Logs");
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      const logText = event.document.getText();
      const errorLog = { logText };

      if (config.getAutoTranslate()) {
        try {
          errorLog.translatedText = await this.translationService.translate(errorLog);
        } catch (error) {
          vscode.window.showErrorMessage("Error translating log: " + error.message);
        }
      }

      errorLog.errorType = this.parseErrorType(logText);
      const suggestions = this.fixRecommendationService.getFixSuggestion(errorLog.errorType);

      if (this.webViewController) {
        this.webViewController.updateWebView(errorLog, suggestions);
      } else {
        vscode.window.showErrorMessage("WebViewController is not initialized.");
      }
    });
  }

  parseErrorType(logText) {
    // 简单解析错误类型的逻辑
    if (logText.includes("SyntaxError")) {
      return "SyntaxError";
    } else if (logText.includes("ReferenceError")) {
      return "ReferenceError";
    }
    return "UnknownError";
  }
}

module.exports = PluginController;
