const assert = require("assert");
const vscode = require("vscode");

suite("Extension Test Suite", () => {
  // 添加日志以确认测试套件开始运行
  console.log("Starting Extension Test Suite...");
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    // 添加日志以确认测试用例开始运行
    console.log("Running Sample test...");
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    // 添加日志以确认测试用例成功运行
    console.log("Sample test passed.");
  });

  // 添加一个简单的测试用例以验证测试框架是否正常工作
  test("Basic assertion test", () => {
    console.log("Running Basic assertion test...");
    assert.strictEqual(1 + 1, 2);
    console.log("Basic assertion test passed.");
  });
});

// 添加全局异常捕获以捕获可能导致闪退的错误
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
