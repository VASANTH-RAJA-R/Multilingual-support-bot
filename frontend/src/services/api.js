export async function sendMessage(message, language) {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error connecting to backend:", error);
    return { reply: "⚠️ Server not responding" };
  }
}
