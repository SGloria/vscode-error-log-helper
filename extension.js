const vscode = require("vscode");
const Controller = require("./src/controller/controller");

let controller;

function activate(context) {
  console.log("Activating vscode-error-log-helper extension...");
  controller = new Controller();
  controller.initialize();
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
