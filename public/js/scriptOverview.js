window.sensorData = {
	currentTemperature: 0,
	currentSoilHumidity: 0,
	currentAirHumidity: 0,
	lightLevel: 0,
	waterLevel:0 
}

let currentTemperature = 0;
let soilHumidity = 0;
let airHumidity = 0;
let waterLevel = 0;
let lightLevel = 0;


/* ===TEMPERATURE CHART=== */

// Chart.js code for temperature chart
const tempCtx = document.getElementById('tempChart').getContext('2d');

// Gradient line
const tempGradient = tempCtx.createLinearGradient(0, 0, 0, 400);
tempGradient.addColorStop(0, '#ff5100');
tempGradient.addColorStop(1, '#ff5100');

const tempChartData = {
	labels: [],
	datasets: [{
		label: 'Temperature (°C)',
		data: [],
		borderColor: tempGradient,
		borderWidth: 3,
		tension: 0.4,
		pointRadius: 0,
		fill: true,
		backgroundColor: (context) => {
			const tempBgGradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
			tempBgGradient.addColorStop(0, '#ffba9a');
			tempBgGradient.addColorStop(1, '#ffffff');
			return tempBgGradient;
		}
	}]
};

const tempChart = new Chart(tempCtx, {
	type: 'line',
	data: tempChartData,
	options: {
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					pointStyle: 'line',
					boxWidth: 40
				}
			}
		},
		scales: {
			x: {
				display: true,
				
				ticks: {
					maxTicksLimit: 6,
					color: '#000000'
				},
				
				grid: {
					color: 'rgba(0,255,255,0.05)'
				}
			},
			y: {
				suggestedMin: 15,
				suggestedMax: 30,
				ticks: {
					color: '#000000'
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.08)'
				}
			}
		}
	}
});

// Återanvändbar funktion
function handleNewTemperature(value) {
	const now = new Date().toLocaleTimeString('sv-SE');

	sensorData.currentTemperature = value;
	document.getElementById("currentTemp").textContent = value + "°C";

	tempChartData.labels.push(now);
	tempChartData.datasets[0].data.push(value);

	if (tempChartData.labels.length > 60) {
		tempChartData.labels.shift();
		tempChartData.datasets[0].data.shift();
	}

	tempChart.update();

	setMood(
		sensorData.currentTemperature,
		sensorData.currentSoilHumidity,
		sensorData.currentAirHumidity,
		sensorData.lightLevel
	);
}



/*===HUMIDITY/MOISTURE CHART === */

const humidityCtx = document.getElementById('moistureChart').getContext('2d');

// Gradient för soil humidity
const soilGradient = humidityCtx.createLinearGradient(0, 0, 0, 400);
soilGradient.addColorStop(0, '#ff5100');
soilGradient.addColorStop(1, '#ff5100');

// Gradient för air humidity
const airGradient = humidityCtx.createLinearGradient(0, 0, 0, 400);
airGradient.addColorStop(0, '#0077ff');
airGradient.addColorStop(1, '#0077ff');

const chartData = {
	labels: [],
	datasets: [
		{
			label: 'Soil Moisture (%)',
			data: [],
			borderColor: soilGradient,
			borderWidth: 3,
			tension: 0.4,
			pointRadius: 0,
		},
		{
			label: 'Air Humidity (%)',
			data: [],
			borderColor: airGradient,
			borderWidth: 3,
			tension: 0.4,
			pointRadius: 0,
			fill: false // sätt true om du också vill fylla under denna linje
		}
	]
};

const chart = new Chart(humidityCtx, {
	type: 'line',
	data: chartData,
	options: {
		animation: false,
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
				align: 'end',
				labels: {
					usePointStyle: true,
					pointStyle: 'line',
					boxWidth: 40
				}
			}
		},
		scales: {
			x: {
				display: true,
				ticks: {
					maxTicksLimit: 6,
					color: '#000000'
				},
				grid: {
					color: 'rgba(0,255,255,0.05)'
				}
			},
			y: {
				suggestedMin: 15,
				suggestedMax: 100,
				ticks: {
					color: '#000000'
				},
				grid: {
					color: 'rgba(0, 0, 0, 0.08)'
				}
			}
		}
	}
});

// Handle AirHumidity och Soil Moisture (Samma graf)
function handleNewHumidity(soilHumidity, airHumidity) {
	const now = new Date().toLocaleTimeString('sv-SE');

	sensorData.currentSoilHumidity = soilHumidity;
	sensorData.currentAirHumidity = airHumidity;

	chartData.labels.push(now);
	chartData.datasets[0].data.push(soilHumidity);
	chartData.datasets[1].data.push(airHumidity);

	if (chartData.labels.length > 60) {
		chartData.labels.shift();
		chartData.datasets[0].data.shift();
		chartData.datasets[1].data.shift();
	}

	chart.update();

	setMood(
		sensorData.currentTemperature,
		sensorData.currentSoilHumidity,
		sensorData.currentAirHumidity,
		sensorData.lightLevel
	);
}



/*===MQTT===*/

const socket = io();

socket.on("mqttMessage", (data) => {
    console.log("Från socket:", data);

if (data.topic === "Temperature") {
    currentTemperature = data.value;
}

if (data.topic === "Soil Moisture") {
   soilHumidity = data.value;
}

if (data.topic === "Humidity") {
    airHumidity = data.value;
}

if (data.topic === "WaterLimit") {
    setWaterLevel(data.value);
}

if (data.topic === "Light level") {
    setLightLevel(data.value);
}


setInterval(() => {
	handleNewHumidity(soilHumidity, airHumidity); 
	handleNewTemperature(currentTemperature);
	//setWaterAndLightLevel(lightLevel);
}, 500); 

});


/*===LIGHT GAIN SLIDER===*/

const myRange = document.getElementById("myRange");

myRange.addEventListener("input", () => {
	
	const value  = myRange.value;
	console.log("Gain value: ", myRange.value);
	
	if(value === "1"){
		socket.emit("Light level", "Gain_Low");
	} else if(value === "2"){
		socket.emit("Light level", "Gain_Medium");
	} else if(value === "3"){
		socket.emit("Light level", "Gain_High");
	} else if(value === "4"){
		socket.emit("Light level", "Gain_Max");
	}
	
});
