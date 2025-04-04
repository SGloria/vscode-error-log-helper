const vscode = require("vscode");
const axios = require("axios");

class APIClient {
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

    try {
      const requestBody = {
        model: "gpt-4o",
        messages: [{ role: "user", content: log }],
        stream: false,
      };

      const response = await axios.post(this.apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

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
}

module.exports = APIClient;
