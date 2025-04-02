class FixRecommendationService {
  constructor() {
    this.recommendationDB = new Map([
      ["TypeError", ["Check variable types", "Ensure proper type casting"]],
      ["SyntaxError", ["Check syntax", "Use a linter"]],
    ]);
  }

  getFixSuggestion(errorType) {
    return this.recommendationDB.get(errorType) || ["No suggestions available"];
  }
}

module.exports = FixRecommendationService;
