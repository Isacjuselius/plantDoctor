let currentTemperature = 0;
let soilHumidity = 0;
let airHumidity = 0;
let lightLevel = 0;

let points = 0;

function setMoisture(value) {
    document.getElementById("moistureProgress").value = value;
    document.getElementById("moistureValue").textContent = value + "%";
    
    let value_num = parseFloat(value)
        
    if (value_num > 30 && value_num < 70){
    document.getElementById("statusMoisture").textContent = 'Optimal';
    } else if (value_num <= 30) {
        document.getElementById("statusMoisture").textContent = 'Too Dry';
    } else {
        document.getElementById("statusMoisture").textContent = 'Too Wet';
    }
}

function setHumidity(value) {
    document.getElementById("humidityProgress").value = value;
    document.getElementById("humidityValue").textContent = value + "%";
    
    let value_num = parseFloat(value);
    if (value_num > 40 && value_num < 80){
    document.getElementById("statusHumidity").textContent = 'Optimal';
    } else if (value_num <= 40) {
        document.getElementById("statusHumidity").textContent = 'Too Dry';
    } else {
        document.getElementById("statusHumidity").textContent = 'Too Humid';
    }
}

function setTemperature(value) {
    document.getElementById("temperatureValue").textContent = value + "°C";
    
    let value_num = parseFloat(value);    
    if (value_num > 18 && value_num < 29){
    document.getElementById("statusTemperature").textContent = 'Optimal';
    } else if (value_num <= 18) {
        document.getElementById("statusTemperature").textContent = 'Too Cold';
    } else {
        document.getElementById("statusTemperature").textContent = 'Too Hot';
    }
}

function setLightLevel(value) {
    document.getElementById("lightLevelValue").textContent = value + " lux";
    
    
    let value_num = parseFloat(value);

    if (value_num > 1000 && value_num < 2000){
    document.getElementById("statusLightLevel").textContent = 'Optimal';
    } else if (value_num <= 1000) {
        document.getElementById("statusLightLevel").textContent = 'Too Dark';
    } else {
        document.getElementById("statusLightLevel").textContent = 'Too Light';
    }
}

function setWaterLevel(value) {
    if(value === "HIGH"){
        document.getElementById("waterLevelValue").textContent = "Sufficient";
    }else if(value === "LOW"){
        document.getElementById("waterLevelValue").textContent = "Insufficient";
    }
}

const socket = io();

socket.on("mqttMessage", (data) => {
    console.log("Från socket:", data);

if (data.topic === "Temperature") {
    setTemperature(data.value);
    currentTemperature = data.value;
}

if (data.topic === "Soil Moisture") {
    setMoisture(data.value);
    soilHumidity = data.value;
}

if (data.topic === "Humidity") {
    setHumidity(data.value);
    airHumidity = data.value;
}

if (data.topic === "WaterLimit") {
   setWaterLevel(data.value);
   waterLevel = data.value;
}

if (data.topic === "Light level") {
    setLightLevel(data.value);
    lightLevel = data.value;
}

});

setInterval(() => {
points = getPoints(
		currentTemperature,
		soilHumidity,
		airHumidity,
        lightLevel
	);
    
if (points === 0) {
    moodPic.src = '../assets/img/mood_bad_white.svg';
    moodTitle.textContent = 'Unhappy';
} else if (points === 1) {
    moodPic.src = '../assets/img/dissatisfied_white.svg';
    moodTitle.textContent = 'Dissatisfied';
} else if (points === 2) {
    moodPic.src = '../assets/img/neutral_white.svg';
    moodTitle.textContent = 'Neutral';
} else if (points === 3) {
    moodPic.src = '../assets/img/Satisfied_white.svg';
    moodTitle.textContent = 'Satisfied';
} else if (points === 4) {
    moodPic.src = '../assets/img/mood_white.svg';
		moodTitle.textContent = 'Happy';
	}

}, 500);

const toggle = document.getElementById("autoWaterToggle");


toggle.addEventListener("change", () => {
    
    console.log("toggle changed");
    
    let msg = toggle.checked ? "AUTOWATERING_ON" : "AUTOWATERING_OFF"; 
        
    socket.emit("WaterLimit", msg);
    socket.emit("toggleChange", toggle.checked);

});

socket.on("toggleState", (state) => {
    console.log("toggle loaded:", state);
    toggle.checked = state;
});


