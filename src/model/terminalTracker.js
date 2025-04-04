const vscode = require("vscode");

class TerminalTracker {
  constructor() {
    this.outputCallback = null;
    this.terminals = new Set();
    this.disposables = [];
  }

  /**
   * 设置终端输出回调
   */
  onTerminalOutput(callback) {
    this.outputCallback = callback;
  }

  /**
   * 启动监听
   */
  startTracking() {
    this.stopTracking();

    // 收集现有终端
    vscode.window.terminals.forEach((term) => this.terminals.add(term));

    // 新终端
    const open = vscode.window.onDidOpenTerminal((term) => {
      this.terminals.add(term);
    });

    // 终端关闭
    const close = vscode.window.onDidCloseTerminal((term) => {
      this.terminals.delete(term);
    });

    // 核心监听函数
    const write = vscode.window.onDidWriteTerminalData(async (e) => {
      if (this.terminals.has(e.terminal) && this.outputCallback) {
        await Promise.resolve(this.outputCallback(e.terminal.name, e.data));
      }
    });

    this.disposables.push(open, close, write);
  }

  /**
   * 停止监听
   */
  stopTracking() {
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];
    this.terminals.clear();
  }
}

module.exports = TerminalTracker;
