function setMoisture(value) {
    document.getElementById("moistureProgress").value = value;
    document.getElementById("moistureValue").textContent = value + "%";
}

function setHumidity(value) {
    document.getElementById("humidityProgress").value = value;
    document.getElementById("humidityValue").textContent = value + "%";
}

function setTemperature(value) {
    document.getElementById("temperatureValue").textContent = value + "°C";
}

function setLightLevel(value) {
    document.getElementById("lightLevelValue").textContent = value;
}

function setWaterLevel(value) {
    document.getElementById("waterLevelValue").textContent = value;
}

setMoisture(70);
setHumidity(70);
setTemperature(20);
setLightLevel("OK");
setWaterLevel(100);