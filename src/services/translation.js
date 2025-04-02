const axios = require("axios");

class TranslationService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async translate(log) {
    if (!this.apiKey) {
      throw new Error("API Key is not set.");
    }

    const requestBody = {
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant for translating error logs." },
        { role: "user", content: log.logText },
      ],
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", requestBody, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Translation failed:", error);
      throw new Error("Failed to translate the log.");
    }
  }
}

module.exports = TranslationService;
