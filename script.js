const startForm = document.getElementById("startForm");
const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const freezeBtn = document.getElementById("freezeBtn");

const diceEl = document.getElementById("dice");
const roundScoreEl = document.getElementById("roundScore");
const totalScoreEl = document.getElementById("totalScore");
const roundsEl = document.getElementById("rounds");
const messageEl = document.getElementById("message");

let roundScore = 0;
let totalScore = 0;
let roundsPlayed = 0;
let isGameRunning = false;
let playerName = "";

function render() {
  roundScoreEl.textContent = roundScore;
  totalScoreEl.textContent = totalScore;
  roundsEl.textContent = roundsPlayed;
  rollBtn.disabled = !isGameRunning;
  freezeBtn.disabled = !isGameRunning;
}

function resetDice() {
  diceEl.className = "dice";
}

function setDiceFace(value) {
  resetDice();
  diceEl.classList.add(`face-${value}`);
}

messageEl.textContent = "Enter your name and press Start Game.";
setDiceFace(1);
render();

/* REQUIRED FIX: submit listener on form */
startForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = playerNameInput.value.trim();
  if (name === "") {
    messageEl.textContent = "Please enter your name.";
    return;
  }

  playerName = name;
  roundScore = 0;
  totalScore = 0;
  roundsPlayed = 1;
  isGameRunning = true;

  startBtn.disabled = true;
  playerNameInput.disabled = true;

  setDiceFace(1);
  messageEl.textContent = `Game started! Good luck, ${playerName}.`;
  render();
});

rollBtn.addEventListener("click", () => {
  if (!isGameRunning) return;

  const dice = Math.floor(Math.random() * 6) + 1;
  setDiceFace(dice);

  if (dice === 1) {
    roundScore = 0;
    roundsPlayed++;
    messageEl.textContent = "You rolled 1 — round lost!";
  } else {
    roundScore += dice;
    messageEl.textContent = `You rolled ${dice}.`;
  }

  render();
});

freezeBtn.addEventListener("click", () => {
  if (!isGameRunning) return;

  totalScore += roundScore;
  roundScore = 0;
  setDiceFace(1);

  if (totalScore >= 100) {
    isGameRunning = false;
    startBtn.disabled = false;
    playerNameInput.disabled = false;
    messageEl.textContent = `🎉 You won, ${playerName}! You finished in ${roundsPlayed} rounds.`;
    render();
    return;
  }

  roundsPlayed++;
  messageEl.textContent = "Score saved. New round!";
  render();
});
