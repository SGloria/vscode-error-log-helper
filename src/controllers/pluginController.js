const vscode = require("vscode");
const TranslationService = require("../services/translation");
const WebViewController = require("./webViewController");
const config = require("../config/config");

class PluginController {
  constructor(apiKey) {
    this.translationService = new TranslationService(apiKey); // 使用传入的 API Key
    this.webViewController = new WebViewController();
  }

  listenToOutput() {
    const outputChannel = vscode.window.createOutputChannel("Error Logs");

    // 模拟监听终端输出的逻辑
    const terminalListener = vscode.window.onDidOpenTerminal((terminal) => {
      console.log(`Terminal opened: ${terminal.name}`);
      terminal.processId.then((pid) => {
        if (pid) {
          vscode.window.showInformationMessage(`Listening to terminal: ${terminal.name}`);
          // 模拟处理终端输出
          terminal.sendText("echo Listening for errors...");
        }
      });
    });

    // 注册终端关闭事件
    const terminalCloseListener = vscode.window.onDidCloseTerminal((terminal) => {
      console.log(`Terminal closed: ${terminal.name}`);
    });

    const errorLogListener = vscode.workspace.onDidChangeTextDocument(async (event) => {
      const logText = event.document.getText();
      if (logText.includes("Error")) {
        console.log("Detected error log:", logText);
        try {
          // 调用翻译服务处理日志
          const translatedText = await this.translationService.translateAndSuggest(logText);
          const suggestions = ["Check variable declaration.", "Ensure proper syntax."]; // 示例建议
          outputChannel.appendLine(`Translated Log: ${translatedText}`);
          // 更新 WebView 内容
          this.webViewController.updateContent(logText, translatedText, suggestions);
        } catch (error) {
          vscode.window.showErrorMessage("Error processing log: " + error.message);
        }
      }
    });

    return [terminalListener, terminalCloseListener, errorLogListener];
  }
}

module.exports = PluginController;
