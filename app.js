const Game = (function () {
	// Cahche the dom
	const botEL = document.querySelector('.bot');
	const nameEL = document.querySelector('.player');
	const cardNode = document.querySelectorAll('.card');
	const errMsg = document.querySelector('.errorMSG');
	let cards = Array.from(cardNode);
	let takenCards = [];
	let gameOver = false;
	let playerScore = 0;
	let botScore = 0;

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
		botEL.style.color = 'black';
		botEL.style.fontWeight = 'normal';
		nameEL.style.color = 'green';
		nameEL.style.fontWeight = 'bold';
		imgs.src = './imgs/redX.jpg';
		imgs.style.width = '50px';
		imgs.style.height = '50px';
		imgs.classList.add('redX');
		curCard.append(imgs);
	}
	function createO(curCard) {
		let imgs = document.createElement('img');
		errMsg.textContent = '';
		botEL.style.fontWeight = 'bold';
		botEL.style.color = 'red';
		nameEL.style.color = 'black';
		nameEL.style.fontWeight = 'normal';
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
				if (curCard.children.length >= 1 && !gameOver) {
					errMsg.style.color = 'red';
					errMsg.style.fontWeight = 'bold';
					errMsg.style.fontSize = '20px';
					errMsg.textContent = "YOU CAN'T GO THERE!";
					return;
				} else {
					switch (turn) {
						case 'playerTurn':
							if (gameOver == true) {
								return;
							} else {
								createX(curCard);
								updateSquares();
								console.log(takenCards);
								turn = 'botTurn';
								console.log(cardNode);
								checkGameOver();
							}
							break;
						case 'botTurn':
							if (gameOver == true) {
								return;
							} else {
								createO(curCard);
								updateSquares();
								botMove();
								turn = 'playerTurn';
								checkGameOver();
							}
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
		// (258) | (147) | (036)
		const redX =
			'<img src="./imgs/redX.jpg" class="redX" style="width: 50px; height: 50px;">';
		const black0 =
			'<img src="./imgs/blackO.jpg" class="blackO" style="width: 50px; height: 50px;">';
		errMsg.style.color = 'black';
		errMsg.style.fontWeight = 'bold';
		errMsg.style.fontSize = '20px';
		for (let index = 0; index < cardNode.length; index++) {
			// Check vertical columns
			if (
				(cardNode[2].innerHTML == redX &&
					cardNode[5].innerHTML == redX &&
					cardNode[8].innerHTML == redX) ||
				(cardNode[1].innerHTML == redX &&
					cardNode[4].innerHTML == redX &&
					cardNode[7].innerHTML == redX) ||
				(cardNode[0].innerHTML == redX &&
					cardNode[3].innerHTML == redX &&
					cardNode[6].innerHTML == redX)
			) {
				errMsg.textContent = 'RED column true';
				errMsg.style.color = 'green';
				botEL.style.color = 'red';
				nameEL.style.color = 'black';
				gameOver = true;
			} else if (
				(cardNode[2].innerHTML == black0 &&
					cardNode[5].innerHTML == black0 &&
					cardNode[8].innerHTML == black0) ||
				(cardNode[1].innerHTML == black0 &&
					cardNode[4].innerHTML == black0 &&
					cardNode[7].innerHTML == black0) ||
				(cardNode[0].innerHTML == black0 &&
					cardNode[3].innerHTML == black0 &&
					cardNode[6].innerHTML == black0)
			) {
				errMsg.textContent = 'BLACK column true';
				errMsg.style.color = 'green';
				botEL.style.color = 'black';
				botEL.style.fontWeight = 'normal';
				nameEL.style.fontWeight = 'bold';
				nameEL.style.color = 'green';
				return (gameOver = true);
			} else if (
				(cardNode[0].innerHTML == redX &&
					cardNode[1].innerHTML == redX &&
					cardNode[2].innerHTML == redX) ||
				(cardNode[3].innerHTML == redX &&
					cardNode[4].innerHTML == redX &&
					cardNode[5].innerHTML == redX) ||
				(cardNode[6].innerHTML == redX &&
					cardNode[7].innerHTML == redX &&
					cardNode[8].innerHTML == redX)
			) {
				errMsg.textContent = 'RED row true';
				errMsg.style.color = 'green';
				botEL.style.color = 'red';
				nameEL.style.color = 'black';
				return (gameOver = true);
				// Check diagnol
			} else if (
				(cardNode[0].innerHTML == black0 &&
					cardNode[1].innerHTML == black0 &&
					cardNode[2].innerHTML == black0) ||
				(cardNode[3].innerHTML == black0 &&
					cardNode[4].innerHTML == black0 &&
					cardNode[5].innerHTML == black0) ||
				(cardNode[6].innerHTML == black0 &&
					cardNode[7].innerHTML == black0 &&
					cardNode[8].innerHTML == black0)
			) {
				errMsg.textContent = 'BLACK row true';
				errMsg.style.color = 'green';
				botEL.style.color = 'black';
				botEL.style.fontWeight = 'normal';
				nameEL.style.fontWeight = 'bold';
				nameEL.style.color = 'green';
				return (gameOver = true);
			} else if (
				(cardNode[0].innerHTML == redX &&
					cardNode[4].innerHTML == redX &&
					cardNode[8].innerHTML == redX) ||
				(cardNode[2].innerHTML == redX &&
					cardNode[4].innerHTML == redX &&
					cardNode[6].innerHTML == redX)
			) {
				errMsg.textContent = 'RED diagnol true';
				errMsg.style.color = 'green';
				botEL.style.color = 'red';
				nameEL.style.color = 'black';
				return (gameOver = true);
			} else if (
				(cardNode[0].innerHTML == black0 &&
					cardNode[4].innerHTML == black0 &&
					cardNode[8].innerHTML == black0) ||
				(cardNode[2].innerHTML == black0 &&
					cardNode[4].innerHTML == black0 &&
					cardNode[6].innerHTML == black0)
			) {
				errMsg.textContent = 'BLACK diagnol true';
				errMsg.style.color = 'green';
				botEL.style.color = 'black';
				botEL.style.fontWeight = 'normal';
				nameEL.style.fontWeight = 'bold';
				nameEL.style.color = 'green';
				return (gameOver = true);
			} else {
				errMsg.textContent = 'no win yet';
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
