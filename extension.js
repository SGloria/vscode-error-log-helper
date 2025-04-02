const vscode = require("vscode");
const PluginController = require("./src/controllers/pluginController");

let pluginController;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Activating vscode-error-log-helper extension...");

  try {
    // 检查 API Key 是否配置
    const apiKey = vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey");
    if (!apiKey) {
      vscode.window.showErrorMessage("API Key is not configured. Please set it in the extension settings.");
      throw new Error("API Key is not configured.");
    }

    // 初始化插件控制器
    pluginController = new PluginController(apiKey); // 传递 API Key
    const listeners = pluginController.listenToOutput();
    console.log("PluginController initialized and output listener attached.");

    // 将所有监听器添加到 context.subscriptions
    listeners.forEach((listener) => context.subscriptions.push(listener));

    // 注册翻译日志命令
    const disposableTranslateLog = vscode.commands.registerCommand("vscode-error-log-helper.translateLog", async () => {
      console.log("Command 'translateLog' executed.");
      const logText = "Sample Error: Something went wrong";
      try {
        const translation = await pluginController.translationService.translateAndSuggest(logText);
        vscode.window.showInformationMessage(`Translated Log: ${translation}`);
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
      }
    });

    context.subscriptions.push(disposableTranslateLog);

    vscode.window.showInformationMessage('Extension "vscode-error-log-helper" is now active!');
    console.log("Extension activated successfully.");
  } catch (error) {
    console.error("Error during activation:", error);
    vscode.window.showErrorMessage(`Activation failed: ${error.message}`);
  }

  // 注册 Hello World 命令
  const disposableHelloWorld = vscode.commands.registerCommand("vscode-error-log-helper.helloWorld", () => {
    console.log("Command 'helloWorld' executed.");
    vscode.window.showInformationMessage("Hello World from vscode-error-log-helper!");
  });

  context.subscriptions.push(disposableHelloWorld);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
