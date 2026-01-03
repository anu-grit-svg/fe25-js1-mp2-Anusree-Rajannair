// Grab elements
const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const freezeBtn = document.getElementById("freezeBtn");

const diceEl = document.getElementById("dice");
const roundScoreEl = document.getElementById("roundScore");
const totalScoreEl = document.getElementById("totalScore");
const roundsEl = document.getElementById("rounds");
const messageEl = document.getElementById("message");

// Game state
let playerName = "";
let roundScore = 0;
let totalScore = 0;
let roundsPlayed = 0;
let isGameRunning = false;

// Render UI
function render() {
  roundScoreEl.textContent = roundScore;
  totalScoreEl.textContent = totalScore;
  roundsEl.textContent = roundsPlayed;

  rollBtn.disabled = !isGameRunning;
  freezeBtn.disabled = !isGameRunning;
}

// Dice helpers
function resetDiceFace() {
  diceEl.className = "dice"; // removes face-x classes
}

function setDiceFace(value) {
  resetDiceFace();
  diceEl.classList.add(`face-${value}`);
}

// Initial state
messageEl.textContent = "Enter your name and press Start Game.";

// OPTION 3: show an idle dice face (1) even before rolling
setDiceFace(1);

render();

// Start game
startBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();

  if (name === "") {
    messageEl.textContent = "Please enter your name.";
    return;
  }

  // reset game
  playerName = name;
  roundScore = 0;
  totalScore = 0;
  roundsPlayed = 1;
  isGameRunning = true;

  // lock name + start while playing
  startBtn.disabled = true;
  playerNameInput.disabled = true;

  // OPTION 3: reset to idle face
  setDiceFace(1);

  messageEl.textContent = `Game started! Good luck, ${playerName}.`;
  render();
});

// Roll dice
rollBtn.addEventListener("click", () => {
  if (!isGameRunning) return;

  const dice = Math.floor(Math.random() * 6) + 1;

  // show rolled face
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

// Freeze
freezeBtn.addEventListener("click", () => {
  if (!isGameRunning) return;

  totalScore += roundScore;
  roundScore = 0;

  // OPTION 3: go back to idle face after freezing
  setDiceFace(1);

  // win check
  if (totalScore >= 100) {
    isGameRunning = false;

    // allow restart
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
