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


// Chart.js code for temperature chart

const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
	type: 'line',
	data: {},
	options: {}
});
*/

const ctx = document.getElementById('tempChart').getContext('2d');

    // 🔥 Gradient line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#00f5ff');
    gradient.addColorStop(1, '#0066ff');

    const chartData = {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            data: [],
            borderColor: gradient,
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
            backgroundColor: (context) => {
                const bgGradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                bgGradient.addColorStop(0, 'rgba(0, 245, 255, 0.25)');
                bgGradient.addColorStop(1, 'rgba(0, 102, 255, 0.02)');
                return bgGradient;
            }
        }]
    };

    const chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#00f5ff',
                        font: {
                            size: 16
                        }
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
                        color: '#8be9fd'
                    },
                    grid: {
                        color: 'rgba(0,255,255,0.08)'
                    }
                }
            }
        }
    });

    // 🔹 Återanvändbar funktion
    function handleNewTemperature(value) {
        const now = new Date().toLocaleTimeString();

        chartData.labels.push(now);
        chartData.datasets[0].data.push(value);

        if (chartData.labels.length > 60) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
        }

        chart.update();
    }

    // 🔹 Dummy-generator
    let t = 0;
    setInterval(() => {
        t += 0.1;
        const dummyTemp = 22 + Math.sin(t) * 3 + (Math.random() - 0.5);
        handleNewTemperature(dummyTemp);
    }, 500);