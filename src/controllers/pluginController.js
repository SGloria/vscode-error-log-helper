const ErrorLog = require("../services/errorLog");
const TranslationService = require("../services/translation");
const FixRecommendationService = require("../services/fixService");
const UserSettings = require("../services/settings");

class PluginController {
  constructor() {
    this.errorLog = null;
    this.settings = new UserSettings();
    this.translationService = new TranslationService("dummy-api-key");
    this.fixService = new FixRecommendationService();
  }

  onLogDetected(logText) {
    this.errorLog = new ErrorLog(logText);
    this.errorLog.parseLog();

    if (this.settings.autoTranslate) {
      this.translationService.translate(this.errorLog);
    }

    const suggestions = this.fixService.getFixSuggestion(this.errorLog.getErrorType());
    console.log("Fix Suggestions:", suggestions);
  }

  updateSettings(newSettings) {
    Object.assign(this.settings, newSettings);
    this.settings.saveSettings();
  }
}

module.exports = PluginController;
