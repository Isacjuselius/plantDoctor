function setWaterAndLightLevel(lightLevel) {
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

	lightLevelValue.textContent = `${Math.floor(roundedLightLevel)} lumen`;
}