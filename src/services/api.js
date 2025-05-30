import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const sendToOpenAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content;

    try {
      return JSON.parse(result);
    } catch (parseError) {
      return {
        answer: result,
        links: [],
      };
    }
  } catch (error) {
    console.error("Error sending to OpenAI:", error);
    throw error;
  }
};
