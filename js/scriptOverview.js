window.sensorData = {
	currentTemperature: 0,
	currentSoilHumidity: 0,
	currentAirHumidity: 0,
	lightLevel: 0
}

/*
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
	currentTemperature = value;
	return null;
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
*/

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
				display: false,
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
	const now = new Date().toLocaleTimeString();

	sensorData.currentTemperature = value;
	document.getElementById("currentTemp").textContent = value.toFixed(1) + "°C";

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

// Dummy-generator
let tempT = 0;
setInterval(() => {
	tempT += 0.1;
	const dummyTemp = 22 + Math.sin(tempT) * 3 + (Math.random() - 0.5);
	handleNewTemperature(dummyTemp);
}, 500);


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
				display: false,
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

// Funktion som uppdaterar båda värdena samtidigt
function handleNewHumidity(soilHumidity, airHumidity) {
	const now = new Date().toLocaleTimeString();

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

// Dummy-generator
let humidityT = 0;
setInterval(() => {
	humidityT += 0.1;
	const dummySoilHumidity = 40 + Math.sin(humidityT) * 10 + (Math.random() - 0.5) * 10;
	const dummyAirHumidity = 60 + Math.sin(humidityT) * 10 + (Math.random() - 0.5) * 10;
	handleNewHumidity(dummySoilHumidity, dummyAirHumidity);
}, 500);

let lightLevel = 0;
setInterval(() => {
	lightLevel += 0.1;
	sensorData.lightLevel = 1500 + Math.sin(lightLevel) * 100 + (Math.random() - 0.5) * 100;
	setWaterAndLightLevel(sensorData.lightLevel);
}, 500);