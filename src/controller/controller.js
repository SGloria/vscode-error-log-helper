const TerminalTracker = require("../model/terminalTracker");
const ErrorTranslator = require("../model/errorTranslator");
const ViewManager = require("../view/viewManager");
const vscode = require("vscode");

class Controller {
  constructor() {
    this.terminalTracker = new TerminalTracker();
    this.errorTranslator = new ErrorTranslator();
    this.viewManager = new ViewManager();
  }

  initialize() {
    const autoTranslate = vscode.workspace.getConfiguration("vscode-error-log-helper").get("autoTranslate");
    if (!autoTranslate) {
      console.log("Auto-translate is disabled.");
      return;
    }
    console.log("Auto-translate is enabled.");

    this.terminalTracker.startTracking();
    console.log("🎉 TerminalTracker activated!");

    this.terminalTracker.onTerminalOutput(async (termName, text) => {
      console.log(`📥 [${termName}] Terminal output detected:\n${text}`);

      if (this.errorTranslator.isError(text)) {
        const translation = await this.errorTranslator.translateError(text);
        console.log(`📤 Translation result: ${translation}`);

        this.viewManager.showTranslation(text, translation);
      }
    });
  }
}

module.exports = Controller;
