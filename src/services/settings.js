class UserSettings {
  constructor() {
    this.autoTranslate = false;
    this.showFixRecommendations = true;
    this.cacheSize = 10;
    this.storagePath = "./settings.json";
  }

  saveSettings() {
    const fs = require("fs");
    fs.writeFileSync(this.storagePath, JSON.stringify(this));
  }

  loadSettings() {
    const fs = require("fs");
    if (fs.existsSync(this.storagePath)) {
      const data = JSON.parse(fs.readFileSync(this.storagePath, 'utf-8'));
      Object.assign(this, data);
    }
  }
}

module.exports = UserSettings;
