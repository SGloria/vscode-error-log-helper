const APIClient = require("./apiClient");
const vscode = require("vscode");
const apiKey = vscode.workspace.getConfiguration("vscode-error-log-helper").get("apiKey");

class ErrorTranslator {
  constructor() {
    this.apiClient = new APIClient(apiKey);
  }

  isError(text) {
    console.log(`Checking if the text is an error: ${text}`);

    const errorKeywords = ["error:", "Error:", "exception:", "Exception:", "fail", "failed"];
    return errorKeywords.some((keyword) => text.includes(keyword));
  }

  async translateError(text) {
    const prompt = this.generatePrompt(text);
    console.log(`Prompt for translation: ${prompt}`);

    return await this.apiClient.translateAndSuggest(prompt);
  }
  generatePrompt(log) {
    return `
      以下是一个错误日志：
      "${log}"
      请翻译成中文，并提供修复建议和相关链接。
    `;
  }
}

module.exports = ErrorTranslator;
