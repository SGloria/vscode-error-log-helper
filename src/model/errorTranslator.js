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
    以下是一段来自终端的错误日志：
    "${log}"
    我正在进行嵌入式系统开发，请将上述错误信息翻译成中文，并结合嵌入式开发的上下文给出详细的修复建议并提供相关的文档链接或参考资料，帮助我更快理解和解决问题。
`;
  }
}

module.exports = ErrorTranslator;
