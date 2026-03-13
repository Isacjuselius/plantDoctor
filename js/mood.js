function setMood(temperature, soilHumidity, airHumidity, lightLevel) {
	let points = 0;

	if (temperature > 18 && temperature < 29) {
		points++;
	}
	if (soilHumidity > 30 && soilHumidity < 70) {
		points++;
	}
	if (airHumidity > 40 && airHumidity < 80) {
		points++;
	}
	if(lightLevel > 1000 && lightLevel < 2000) {
		points++;
	}

	const moodPic = document.getElementById('moodPic');
	const moodTitle = document.getElementById('moodTitle');
	const moodDescription = document.getElementById('moodDescription');
	const moodDescriptionMuted = document.getElementById('moodDescriptionMuted');

	if (points === 0) {
		moodPic.src = '../assets/img/mood_bad_white.svg';
		moodTitle.textContent = 'Unhappy';
		moodDescription.textContent = 'Your plant is struggling.';
		moodDescriptionMuted.textContent = 'Consider adjusting the conditions.';
	} else if (points === 1) {
		moodPic.src = '../assets/img/dissatisfied_white.svg';
		moodTitle.textContent = 'Dissatisfied';
		moodDescription.textContent = 'Your plant is not doing well.';
		moodDescriptionMuted.textContent = 'Try to improve the conditions.';
	} else if (points === 2) {
		moodPic.src = '../assets/img/neutral_white.svg';
		moodTitle.textContent = 'Neutral';
		moodDescription.textContent = 'Your plant is doing okay.';
		moodDescriptionMuted.textContent = 'There is room for improvement.';
	} else if (points === 3) {
		moodPic.src = '../assets/img/Satisfied_white.svg';
		moodTitle.textContent = 'Satisfied';
		moodDescription.textContent = 'Your plant is doing well!';
		moodDescriptionMuted.textContent = 'Keep up the good work!';
	} else if (points === 4) {
		moodPic.src = '../assets/img/mood_white.svg';
		moodTitle.textContent = 'Happy';
		moodDescription.textContent = 'Your plant is thriving!';
		moodDescriptionMuted.textContent = 'Excellent work!';
	}
}