const vscode = require("vscode");

module.exports = {
  getApiKey: () => vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey"),
  getAutoTranslate: () => vscode.workspace.getConfiguration("vscode-error-log-helper").get("autoTranslate"),
};
