const vscode = require("vscode");

class ViewManager {
  constructor() {
    this.panel = null;
  }

  createPanel() {
    if (this.panel) {
      this.panel.reveal();
      return;
    }

    this.panel = vscode.window.createWebviewPanel("errorTranslation", "错误翻译", vscode.ViewColumn.Two, {
      enableScripts: true,
    });

    this.panel.onDidDispose(() => {
      this.panel = null;
    });
  }

  showTranslation(original, translated) {
    this.createPanel();
    this.panel.webview.html = this.getWebviewContent(original, translated);
  }

  getWebviewContent(original, translated) {
    // Remove ANSI color codes from the original error
    const cleanOriginal = original.replace(/\x1b\[[0-9;]*m/g, '');
    
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                        padding: 20px;
                        line-height: 1.6;
                        color: var(--vscode-editor-foreground);
                        background-color: var(--vscode-editor-background);
                    }
                    pre {
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 15px;
                        border-radius: 4px;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        color: var(--vscode-editor-foreground);
                        border: 1px solid var(--vscode-editor-lineHighlightBorder);
                    }
                    h3 {
                        color: var(--vscode-editor-foreground);
                        margin-top: 20px;
                    }
                    a {
                        color: var(--vscode-textLink-foreground);
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    #translation {
                        color: var(--vscode-editor-foreground);
                    }
                    #translation code {
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-family: 'Consolas', 'Monaco', monospace;
                    }
                    #translation pre {
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 10px;
                        border-radius: 4px;
                        overflow-x: auto;
                    }
                    #translation ul, #translation ol {
                        padding-left: 20px;
                    }
                </style>
            </head>
            <body>
                <h3>原始错误:</h3>
                <pre>${cleanOriginal}</pre>
                <h3>翻译解释:</h3>
                <div id="translation"></div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"></script>
            <script>
                const markdown = \`${translated.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`;
                console.log('Markdown content:', markdown);
                
                const converter = new showdown.Converter({
                    tables: true,
                    tasklists: true,
                    strikethrough: true,
                    simpleLineBreaks: true
                });
                converter.setOption('openLinksInNewWindow', true);
                
                try {
                    const html = converter.makeHtml(markdown);
                    console.log('Converted HTML:', html);
                    document.getElementById('translation').innerHTML = html;
                } catch (error) {
                    console.error('Error converting markdown:', error);
                    document.getElementById('translation').innerHTML = '<p>Error displaying translation. Please check the console for details.</p>';
                }
            </script>
            
            </html>
        `;
  }

  dispose() {
    if (this.panel) {
      this.panel.dispose();
      this.panel = null;
    }
  }
}

module.exports = ViewManager;
