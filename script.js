// =======================
// PAGE 3: SUDOKU
// =======================

const sudokuGrid = document.getElementById("sudokuGrid");
const sudokuMsg = document.getElementById("sudokuMsg");
const checkSudokuBtn = document.getElementById("checkSudokuBtn");

// Fixed Sudoku puzzle with 1 missing cell
// 0 = empty
const sudokuPuzzle = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],

  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],

  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 0] // last cell missing
];

// The correct missing number
const correctAnswer = 9;

function renderSudoku() {
  if (!sudokuGrid) return;

  sudokuGrid.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = sudokuPuzzle[row][col];

      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Thick borders
      if (col === 2 || col === 5) cell.classList.add("thickRight");
      if (row === 2 || row === 5) cell.classList.add("thickBottom");

      if (value === 0) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.inputMode = "numeric";
        input.placeholder = "";
        input.classList.add("sudokuInput");


        input.addEventListener("input", () => {
          // Only allow 1-9
          input.value = input.value.replace(/[^1-9]/g, "");
        });

        cell.appendChild(input);
      } else {
        cell.textContent = value;
        cell.classList.add("fixed");
      }

      sudokuGrid.appendChild(cell);
    }
  }
}

function checkSudoku() {
  if (!sudokuGrid) return;

  const input = sudokuGrid.querySelector("input");
  if (!input) return;

  const val = Number(input.value);

  if (val === correctAnswer) {
    sudokuMsg.textContent = "OKAY SMART GIRL 😭💖 unlocking...";
    setTimeout(() => {
      window.location.href = "tangled.html";
    }, 900);
  } else {
    const lines = [
      "Nope 😼 try again.",
      "Wrong number bestie 😭",
      "Close… but no 😌",
      "Sudoku says: denied 🙄"
    ];
    sudokuMsg.textContent = lines[Math.floor(Math.random() * lines.length)];
  }
}

if (checkSudokuBtn) {
  renderSudoku();
  checkSudokuBtn.addEventListener("click", checkSudoku);
}

// =======================
// PAGE 5: FINAL QUESTION
// =======================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalMessage = document.getElementById("finalMessage");
const meowSound = document.getElementById("meowSound");

let noClicks = 0;

if (yesBtn && noBtn) {
  yesBtn.addEventListener("click", () => {
    finalMessage.textContent = "YAYYYY 😭💖 I knew it!!";

    // Meow sound
    if (meowSound) {
      meowSound.currentTime = 0;
      meowSound.play();
    }

    // Confetti
    if (typeof confetti !== "undefined") {
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
      }, 300);
    }
  });

  // No button runs away
  noBtn.addEventListener("mouseover", () => {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 240 - 120;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });

  // If she clicks no somehow
  noBtn.addEventListener("click", () => {
    noClicks++;

    const scale = Math.max(0.55, 1 - noClicks * 0.12);
    noBtn.style.transform = `scale(${scale})`;

    const lines = [
      "Nice try 😌",
      "Not happening 😼",
      "You’re literally lying 🙄",
      "Be serious 😂",
      "Stoppp 😭",
      "Okay okay you’re just playing now"
    ];

    finalMessage.textContent = lines[Math.min(noClicks, lines.length - 1)];
  });
}
