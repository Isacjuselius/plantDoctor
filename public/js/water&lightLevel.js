function setLightLevel(lightLevel) {
	const lightLevelValue = document.getElementById('lightLevelValue');
	const lightLevelTitle = document.getElementById('lightLevelTitle');
	const lightLevelPic = document.getElementById('lightLevelPic');
	roundedLightLevel = Math.floor(lightLevel);

	if(roundedLightLevel < 1000) {
		lightLevelTitle.textContent = 'Too dark';
		lightLevelPic.src = '../assets/img/too_dark.svg';
	} else if(roundedLightLevel >= 2000) {
		lightLevelTitle.textContent = 'Too bright';
		lightLevelPic.src = '../assets/img/too_bright.svg';
	}else {
		lightLevelTitle.textContent = 'Normal';
		lightLevelPic.src = '../assets/img/sunny_black.svg';
	}

	lightLevelValue.textContent = `${Math.floor(roundedLightLevel)} lux`;
}

function setWaterLevel(waterLevel) {
	const waterLevelTitle = document.getElementById('waterLevelTitle');
	const waterLevelAction = document.getElementById('waterLevelAction');
	const waterLevelPic = document.getElementById('waterLevelPic');
	
	if(waterLevel === 'HIGH') {
		waterLevelTitle.textContent = 'Sufficient';
		waterLevelAction.textContent = 'No action required';
		waterLevelPic.src = '../assets/img/okay.svg'; 
	} else if (waterLevel === "LOW") {
		waterLevelTitle.textContent = 'Insufficient';
		waterLevelAction.textContent = 'Refill watertank';
		waterLevelPic.src = '../assets/img/warning.svg';
	}
}
