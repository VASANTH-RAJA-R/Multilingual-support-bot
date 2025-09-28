import React, { useState } from "react";
import { sendMessage } from "../services/api";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Call backend API
    const response = await sendMessage(input, "en"); // default English
    const botReply = response?.reply || "⚠️ Error from server";

    // Add bot message
    setMessages([...newMessages, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              color: msg.sender === "user" ? "blue" : "green",
            }}
          >
            <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "10px", marginTop: "10px" }}
      />
      <button onClick={handleSend} style={{ padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}

export default ChatBox;
