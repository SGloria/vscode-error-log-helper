class ErrorLogWebView {
  constructor() {
    this.displayedLog = null;
  }

  displayLog(log) {
    console.log("Displaying Log:", log.translatedText || log.logText);
  }

  updateFixSuggestions(suggestions) {
    console.log("Fix Suggestions:", suggestions);
  }
}

module.exports = ErrorLogWebView;
