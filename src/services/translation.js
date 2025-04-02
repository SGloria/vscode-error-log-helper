const axios = require("axios");

class TranslationService {
  constructor(apiKey, apiUrl = "https://api.deerapi.com/v1/chat/completions") {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async translateAndSuggest(log) {
    if (!this.apiKey) {
      throw new Error("API Key is not set.");
    }

    const prompt = this.generatePrompt(log);

    try {
      const requestBody = {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      };

      const response = await axios.post(this.apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`, // 确保正确设置 API Key
          "Content-Type": "application/json",
        },
        timeout: 10000, // 设置超时时间为 10 秒
      });

      // 检查响应结构并提取内容
      if (
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
      ) {
        return response.data.choices[0].message.content;
      } else {
        console.error("Invalid response structure:", response.data);
        throw new Error("Invalid response structure from chat API.");
      }
    } catch (error) {
      console.error("Chat API request failed:", {
        message: error.message,
        response: error.response ? error.response.data : null,
      });
      throw new Error("Failed to process the log. Please check your API key, network connection, and API URL.");
    }
  }

  generatePrompt(log) {
    return `
      以下是一个错误日志：
      "${log}"
      请翻译成中文，并提供修复建议和相关链接。
    `;
  }
}

module.exports = TranslationService;
