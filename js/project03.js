// This file contains the JavaScript code for the memory matching game, managing card flips, moves tracking, and game resets.

let cards;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let timer;
let timeTaken = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById('move-count').innerText = moves;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    checkGameOver();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function startGame() {
    cards = document.querySelectorAll('.card');
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
    timer = setInterval(() => {
        timeTaken++;
        document.getElementById('timer').innerText = timeTaken;
    }, 1000);
}

function restartGame() {
    clearInterval(timer);
    timeTaken = 0;
    moves = 0;
    document.getElementById('timer').innerText = timeTaken;
    document.getElementById('move-count').innerText = moves;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    startGame();
}

function checkGameOver() {
    if (document.querySelectorAll('.card.flip').length === cards.length) {
        clearInterval(timer);
    }
}

document.getElementById('restart-button').addEventListener('click', restartGame);
startGame();