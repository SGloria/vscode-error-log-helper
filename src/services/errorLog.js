class ErrorLog {
  constructor(logText) {
    this.logText = logText;
    this.translatedText = "";
    this.errorType = "";
  }

  parseLog() {
    // 示例: 简单解析日志并提取错误类型
    const errorMatch = this.logText.match(/ERROR: (.+)/);
    this.errorType = errorMatch ? errorMatch[1] : "Unknown";
  }

  getErrorType() {
    return this.errorType;
  }
}

module.exports = ErrorLog;
