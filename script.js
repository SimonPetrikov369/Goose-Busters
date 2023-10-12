const duck = document.querySelector('.duck');
const scoreValue = document.getElementById('scoreValue');
const score = document.getElementById('score');


let currentScore = 0;
let timer = 30;
let intervalId;
const geese = [
    "goose", 
    "goose2",
    "goose3", 
    "goose4"
]
const startButton = document.getElementById("startButton");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

const finalScoreElement = document.getElementById("finalScore");
const playAgainButton = document.getElementById("playAgainButton");

const gamecontainer = document.getElementById("game-container")
const audioPlayer = document.getElementById('audioPlayer');
const gameOverModal = document.getElementById("gameOverModal");
const modalWin = document.getElementById("modalWin");
const modalGameOver = document.getElementById("modalGameOver");

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", playAgain);

function startGame(){
    currentScore = 0;
    timer = 30;
    randomizeGeeze();
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
    resetTimer()
    startButton.disabled = false;
}
function updateTimer() {
    timerElement.textContent = timer + " seconds";
}
function randomizeGeeze(){
    const randomImageUrl = geese[Math.floor(Math.random() * geese.length)];
    duck.style.backgroundImage = `url('${randomImageUrl}.png')`
}
function resetTimer(){
    timerElement.textContent = "30 seconds";
}
duck.addEventListener('click', () => {
    currentScore++;
    playAudio();
    updateScore();
    moveDuckRandomly();
    randomizeGeeze();
});

function showGoose(){
    duck.style.display="block"
}
function moveDuckRandomly() {
    const maxWidth = gamecontainer.clientWidth - duck.clientWidth;
    const maxHeight = gamecontainer.clientHeight - duck.clientHeight;

    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;

    duck.style.left = randomX + 'px';
    duck.style.top = randomY + 'px';
}