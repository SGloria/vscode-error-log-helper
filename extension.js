// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const PluginController = require("./src/controllers/pluginController");

let pluginController;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // 初始化插件控制器
  pluginController = new PluginController();

  // 注册翻译日志命令
  const disposableTranslateLog = vscode.commands.registerCommand("vscode-error-log-helper.translateLog", () => {
    // 示例日志文本，实际使用时应替换为从用户环境中获取的日志
    const logText = "Sample Error: Something went wrong";
    pluginController.onLogDetected(logText);
  });

  context.subscriptions.push(disposableTranslateLog);

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-error-log-helper" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableHelloWorld = vscode.commands.registerCommand("vscode-error-log-helper.helloWorld", function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from vscode-error-log-helper!");
  });

  context.subscriptions.push(disposableHelloWorld);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
