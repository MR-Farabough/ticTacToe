const Game = (function () {
	// Cahche the dom
	const botEL = document.querySelector('.bot');
	const nameEL = document.querySelector('.player');
	const cardNode = document.querySelectorAll('.card');
	const errMsg = document.querySelector('.errorMSG');
	let cards = Array.from(cardNode);
	let takenCards = [];

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
		cardNode.forEach((curCard) => {
			curCard.addEventListener('click', () => {
				// Add Image
				let imgs = document.createElement('img');
				// curCard Validation
				if (curCard.children.length >= 1) {
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
							curCard.append(imgs);
							turn = 'botTurn';
							updateSquares();
							console.log(takenCards);
							break;
						case 'botTurn':
							errMsg.textContent = '';
							botEL.style.color = 'black';
							botEL.style.fontWeight = 'normal';
							nameEL.style.color = 'green';
							nameEL.style.fontWeight = 'bold';
							imgs.src = './imgs/blackO.jpg';
							imgs.style.width = '50px';
							imgs.style.height = '50px';
							imgs.classList.add('blackO');
							curCard.append(imgs);
							turn = 'playerTurn';
							updateSquares();
							console.log(takenCards);
							break;
					}
				}
			});
		});
	}
	function updateSquares() {
		let numArr = [];
		cardNode.forEach((card) => {
			if (card.innerHTML.length > 5) {
				numArr.push(cards.indexOf(card));
			}
		});
		takenCards = numArr;
	}
	function render() {
		getName();
		getBot();
		cardListener();
	}
	render();

	return { getName, getBot };
})();
