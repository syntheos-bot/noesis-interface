// Simple Node.js server for NOESIS Project (ÉLÉA Interface)

const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("ÉLÉA connected via WebSocket");

  ws.on("message", (msg) => {
    console.log("User:", msg.toString());
    ws.send("Echo: " + msg.toString());
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
