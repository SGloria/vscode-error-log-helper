// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const PluginController = require("./src/controllers/pluginController");
const axios = require("axios");

let pluginController;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Activating vscode-error-log-helper extension...");

  try {
    // 检查 API Key 是否配置
    const apiKey = vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey");
    if (!apiKey) {
      throw new Error("API Key is not configured. Please set it in the extension settings.");
    }

    // 初始化插件控制器
    pluginController = new PluginController();
    console.log("PluginController initialized.");

    // 注册翻译日志命令
    const disposableTranslateLog = vscode.commands.registerCommand("vscode-error-log-helper.translateLog", async () => {
      console.log("Command 'translateLog' executed.");
      // 示例日志文本，实际使用时应替换为从用户环境中获取的日志
      const logText = "Sample Error: Something went wrong";
      try {
        const translation = await translateLog(logText, "gpt-4o");
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

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableHelloWorld = vscode.commands.registerCommand("vscode-error-log-helper.helloWorld", function () {
    console.log("Command 'helloWorld' executed.");
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from vscode-error-log-helper!");
  });

  context.subscriptions.push(disposableHelloWorld);
}

// This method is called when your extension is deactivated
function deactivate() {}

async function translateLog(log, model = "gpt-4o") {
  const apiKey = vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey");
  if (!apiKey) {
    throw new Error("API Key is not configured. Please set it in the extension settings.");
  }

  if (!["gpt-4o", "gpt-4o-mini"].includes(model)) {
    throw new Error("Only gpt-4o and gpt-4o-mini models are supported. Please contact the assistant for other models.");
  }

  const apiUrl = "https://api.deerapi.com/v1/chat/completions";

  try {
    const requestBody = {
      model,
      messages: [{ role: "user", content: log }],
      stream: false,
    };

    console.log("Sending request to API:", requestBody);

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Received response from API:", response.data);

    if (
      response.data &&
      response.data.choices &&
      response.data.choices[0] &&
      response.data.choices[0].message &&
      response.data.choices[0].message.content
    ) {
      return response.data.choices[0].message.content;
    } else {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response structure from translation API.");
    }
  } catch (error) {
    console.error("Error translating log:", error.response ? error.response.data : error.message);
    throw new Error("Failed to translate log. Please check your API key and network connection.");
  }
}

module.exports = {
  activate,
  deactivate,
};
