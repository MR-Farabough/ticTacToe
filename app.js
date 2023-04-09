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
	function createX(curCard) {
		let imgs = document.createElement('img');
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
	}
	function createO(curCard) {
		let imgs = document.createElement('img');
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
	}
	function cardListener() {
		let turn = 'botTurn';
		cardNode.forEach((curCard) => {
			curCard.addEventListener('click', () => {
				if (curCard.children.length >= 1) {
					errMsg.style.color = 'red';
					errMsg.style.fontWeight = 'bold';
					errMsg.style.fontSize = '20px';
					errMsg.textContent = "YOU CAN'T GO THERE!";
					return;
				} else {
					switch (turn) {
						case 'playerTurn':
							createX(curCard);
							updateSquares();
							console.log(takenCards);
							turn = 'botTurn';
							checkGameOver();
							break;
						case 'botTurn':
							createO(curCard);
							updateSquares();
							botMove();
							turn = 'playerTurn';
							checkGameOver();
							break;
					}
				}
			});
		});
	}
	function botMove() {
		let number = Math.floor(Math.random() * 9);
		if (takenCards.includes(number)) {
			botMove();
		} else {
			setTimeout(() => {
				cardNode[number].click();
			}, 100);
		}
	}
	function checkGameOver() {
		// 0 | 1 | 2
		// 3 | 4 | 5
		// 6 | 7 | 8
		// (258) | (147) | (036) | (012) | (345) | (678) | (048) | (246)
		for (let index = 0; index < cardNode.length; index++) {
			// Check vertical columns
			if (
				cardNode[index].innerHTML.length > 1 &&
				cardNode[index + 3].innerHTML.length > 1 &&
				cardNode[index + 6].innerHTML.length > 1
			) {
				console.log('column true');
				// Check horizontal rows
			} else if (
				cardNode[index].innerHTML.length > 1 &&
				cardNode[index + 1].innerHTML.length > 1 &&
				cardNode[index + 2].innerHTML.length > 1
			) {
				console.log('row true');
				// Check diagnol
			} else if (
				cardNode[0].innerHTML.length > 1 &&
				cardNode[4].innerHTML.length > 1 &&
				cardNode[8].innerHTML.length > 1
			) {
				console.log('diagnol true');
				// No Win
			} else {
				console.log('no win yet');
			}
		}
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
