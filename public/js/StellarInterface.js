// StellarInterface.js
// Client-side script for NOESIS (ÉLÉA Interface)

// Connect to WebSocket server
const ws = new WebSocket(`ws://${window.location.host}`);

// DOM elements
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
const messagesContainer = document.getElementById("messages-container");

// Append a message to the screen
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "elea-message";
  msg.textContent = `${sender === "user" ? "You" : "ÉLÉA"}: ${text}`;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // auto scroll
}

// Send message to server
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  addMessage("user", text);
  ws.send(text);
  input.value = "";
}

// Receive message from server
ws.onmessage = (event) => {
  addMessage("elea", event.data);
};

// Event listeners
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
