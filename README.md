# vscode-error-log-helper

## 功能

- 自动翻译错误日志。
- 提供修复建议和相关链接。
- 支持用户自定义设置。

## 使用说明

1. 安装插件。
2. 在 VS Code 设置中配置 `vscode-error-log-helper.apiKey`。
3. 打开日志文件，插件会自动翻译日志，并通过聊天接口生成修复建议和链接。

## 配置项

- `vscode-error-log-helper.apiKey`: GPT-4 API Key。
- `vscode-error-log-helper.autoTranslate`: 是否自动翻译日志，默认为 `true`。

## 示例

以下是一个错误日志的翻译和修复建议示例：

```
错误日志: ReferenceError: x is not defined
翻译: 引用错误：变量 x 未定义
修复建议:
1. 确保变量 x 已声明。
2. 检查变量的作用域。
相关链接: [MDN ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined)
```

```
![示例截图](https://github.com/your-repo-name/vscode-error-log-helper/raw/main/images/example.png)
```
