const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Koppla till din lokala på Pi
const client = mqtt.connect("mqtt://localhost");

client.on("connect", () => {
	console.log("Connected to MQTT broker");
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

app.use(express.static("public"));
server.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});