const axios = require("axios");

class TranslationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async translateAndSuggest(log) {
    if (!this.apiKey) {
      throw new Error("API Key is not set.");
    }
    console.log("log:", log);

    const apiUrl = "https://api.deerapi.com/v1/chat/completions";
    const prompt = `
      以下是一个错误日志：
      "${log}"
      请翻译成中文，并提供修复建议和相关链接。
    `;

    try {
      const requestBody = {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
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
      console.error("Chat API request failed:", error.response ? error.response.data : error.message);
      throw new Error("Failed to process the log. Please check your API key and network connection.");
    }
  }
}

module.exports = TranslationService;
