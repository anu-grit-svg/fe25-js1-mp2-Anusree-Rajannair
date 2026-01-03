# Pig Dice Game 🎲

A single-player browser game based on the classic **Pig Dice Game**.  
The goal is to reach **100 points** in as few rounds as possible without losing your round score.

---

## 🎮 How the game works

- Enter your name and press **Start**
- Click **Roll** to roll the dice (1–6)
- Each roll (2–6) adds points to your **Round score**
- If you roll **1**, you lose the round score and the round ends
- Click **Freeze** to save the round score into **Total score**
- The game continues until **Total score ≥ 100**
- When you win, the game shows how many rounds it took

---

## 🧠 Game rules (logic)

- Rolling **1**:
  - Round score resets to 0
  - New round starts
- Freeze:
  - Round score → Total score
  - Round score resets
  - New round starts
- Winning condition:
  - Total score reaches **100 or more**
  - Roll and Freeze buttons are disabled

---

## 🛠 Technologies used

- **HTML** – structure
- **CSS** – styling and UI
- **JavaScript** – game logic and DOM manipulation

No external libraries are used.

---

## 📁 Project structure
