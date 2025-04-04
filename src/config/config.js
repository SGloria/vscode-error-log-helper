const vscode = require("vscode");

module.exports = {
  getApiKey: () => {
    const apiKey = vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey");
    if (!apiKey) {
      throw new Error("API Key is not configured. Please set it in the extension settings.");
    }
    return apiKey;
  },
  getAutoTranslate: () => {
    const autoTranslate = vscode.workspace.getConfiguration("vscode-error-log-helper").get("autoTranslate");
    return autoTranslate !== undefined ? autoTranslate : true;
  },
};
