const duck = document.querySelector('.duck');
const scoreValue = document.getElementById('scoreValue');
const score = document.getElementById('score');


let currentScore = 0;
let timer = 60;
let intervalId;

const startButton = document.getElementById("startButton");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const playAgainButton = document.getElementById("playAgainButton");
const modalGameOver = document.getElementById("modalGameOver");
const gamecontainer = document.getElementById("game-container")
const audioPlayer = document.getElementById('audioPlayer');
const modalWin = document.getElementById("modalWin")

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", playAgain);

function startGame(){
    currentScore = 0;
    timer = 30;
    showGoose()
    moveDuckRandomly();
    updateScore();
    startTimer();
    startButton.disabled = true;
}

function startTimer() {
    intervalId = setInterval(() => {
      timer--;
      updateTimer();
      if (timer <= 0) {
        clearInterval(intervalId);
        checkGameOutcome();
      }
    }, 1000);
}

function checkGameOutcome() {
    if (currentScore >= 50) {
    //   // Player wins
        gameOverModal.classList.remove("hidden");
        modalWin.classList.remove("hidden");
    } else {
    //   // Player loses
    //   gameOverModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        gameOverModal.classList.remove("hidden");
        modalGameOver.classList.remove("hidden");
    }
    finalScoreElement.textContent = currentScore;
    // gameOverModal.style.display = "flex";
  }
function updateScore(){
    scoreValue.textContent = currentScore;
}

function playAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }
}

function playAgain() {
    gameOverModal.classList.add("hidden");
    modalGameOver.classList.add("hidden");
    modalWin.classList.add("hidden");
    startButton.disabled = false;
}
function updateTimer() {
    timerElement.textContent = timer + " seconds";
}
duck.addEventListener('click', () => {
    currentScore++;
    playAudio()
    updateScore()
    moveDuckRandomly();
});

function showGoose(){
    duck.style.display="block"
}
function moveDuckRandomly() {
    // const maxWidth = window.innerWidth - duck.clientWidth;
    // const maxHeight = window.innerHeight - duck.clientHeight;

    const maxWidth = gamecontainer.clientWidth - duck.clientWidth;
    const maxHeight = gamecontainer.clientHeight - duck.clientHeight;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    duck.style.left = randomX + 'px';
    duck.style.top = randomY + 'px';
}