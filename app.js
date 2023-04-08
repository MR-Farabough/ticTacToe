const Game = (function () {
	// Cahche the dom
	const botEL = document.querySelector('.bot');
	const nameEL = document.querySelector('.player');
	const container = document.getElementById('contianer');
	const card = document.querySelectorAll('.card');
	const errMsg = document.querySelector('.errorMSG');

	function getName() {
		const name = 'Player'; // prompt('Player Name?');
		if (name === null || name.length < 2) {
			nameEL.textContent = 'Player 1';
		} else {
			nameEL.textContent = name;
		}
	}
	function getBot() {
		const botName = `BOT${Math.floor(Math.random() * 1000)}`;
		botEL.textContent = botName;
	}
	function cardListener() {
		let turn = 'playerTurn';
		card.forEach((card) => {
			card.addEventListener('click', () => {
				// Add Image
				let imgs = document.createElement('img');
				// Card Validation
				if (card.children.length >= 1) {
					errMsg.style.color = 'red';
					errMsg.style.fontWeight = 'bold';
					errMsg.style.fontSize = '20px';
					errMsg.textContent = "YOU CAN'T GO THERE!";
					return;
				} else {
					switch (turn) {
						case 'playerTurn':
							errMsg.textContent = '';
							botEL.style.fontWeight = 'bold';
							botEL.style.color = 'green';
							nameEL.style.color = 'black';
							nameEL.style.fontWeight = 'normal';
							imgs.src = './imgs/redX.jpg';
							imgs.style.width = '50px';
							imgs.style.height = '50px';
							imgs.classList.add('redX');
							card.append(imgs);
							turn = 'botTurn';
							break;
						case 'botTurn':
							errMsg.textContent = '';
							botEL.style.color = 'black';
							nameEL.style.color = 'green';
							botEL.style.fontWeight = 'normal';
							nameEL.style.fontWeight = 'bold';
							imgs.src = './imgs/blackO.jpg';
							imgs.style.width = '50px';
							imgs.style.height = '50px';
							imgs.classList.add('blackO');
							card.append(imgs);
							turn = 'playerTurn';
							break;
					}
				}
			});
		});
	}
	function render() {
		getName();
		getBot();
		cardListener();
	}
	render();
	return { getName, getBot };
})();
