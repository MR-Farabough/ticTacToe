const Game = (function () {
	function getName() {
		const name = 'Player'; // prompt('Player Name?');
		const nameEL = document.querySelector('.player');
		if (name === null || name.length < 2) {
			nameEL.textContent = 'Player 1';
		} else {
			nameEL.textContent = name;
		}
	}
	function getBot() {
		const botName = `BOT${Math.floor(Math.random() * 1000)}`;
		const botEL = document.querySelector('.bot');
		botEL.textContent = botName;
	}
	function render() {
		getName();
		getBot();
	}
	render();
	return { getName, getBot };
})();
