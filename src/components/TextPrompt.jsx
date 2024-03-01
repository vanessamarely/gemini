import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const TextPrompt = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await model.generateContent(output);
    const response = await result.response;
    setOutput(response.text());
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter your prompt here..."
          value={input}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSubmit}>Generar</button>
      {output && <p>{output}</p>}
    </div>
  );
};

export default TextPrompt;
