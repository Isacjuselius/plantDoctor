const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");

const client = mqtt.connect("mqtt://localhost");

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("Temperature");
  client.subscribe("Soil Moisture");
  client.subscribe("Humidity");
  client.subscribe("WaterLimit");
  client.subscribe("Light level");
});

client.on("message", (topic, message) => {
  io.emit("mqttMessage", {
    topic: topic,
    value: message.toString()
  });
});

io.on("connection", (socket) => {
  console.log("Browser connected");
  socket.on("WaterLimit", (msg) => {
    client.publish("WaterLimit", msg);
  });
});

app.use(express.static(path.join(__dirname, "public")));
server.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});



