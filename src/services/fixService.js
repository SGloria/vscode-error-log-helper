class FixRecommendationService {
  constructor() {
    this.recommendationDB = {
      SyntaxError: ["Check for missing or extra brackets.", "Ensure proper syntax."],
      ReferenceError: ["Check if variables are defined.", "Ensure proper scope usage."],
      UnknownError: ["Consult documentation.", "Search for similar issues online."],
    };
  }

  getFixSuggestion(errorType) {
    return this.recommendationDB[errorType] || ["No suggestions available."];
  }
}

module.exports = FixRecommendationService;
