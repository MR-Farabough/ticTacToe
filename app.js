const Game = {
	getName: function () {
		const name = prompt('Player Name?');
		const nameEL = document.querySelector('.player');
		nameEL.textContent = name;
	},
	getBot: function () {
		const botName = `BOT${Math.floor(Math.random() * 1000)}`;
		const botEL = document.querySelector('.bot');
		botEL.textContent = botName;
	},
	render: function () {
		this.getName();
		this.getBot();
	},
};

Game.render();
