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
