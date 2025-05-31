const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
let score = 0;
let streak = 0;
let intervalTime = 2000;
let gameInterval;

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const x = Math.random() * (gameArea.clientWidth - 50);
  const y = Math.random() * (gameArea.clientHeight - 50);

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  circle.addEventListener("click", () => {
    score++;
    streak++;
    scoreDisplay.textContent = score;
    circle.remove();

    // Subir de nivel cada 5 aciertos seguidos
    if (streak % 5 === 0) {
      alert("¡Siguiente nivel!");
      aumentarDificultad();
    }
  });

  gameArea.appendChild(circle);

  setTimeout(() => {
    if (circle.parentElement) {
      circle.remove();
      streak = 0; // Reiniciar racha si falló
    }
  }, 1500);
}

function startGame() {
  gameInterval = setInterval(createCircle, intervalTime);
}

function aumentarDificultad() {
  clearInterval(gameInterval);
  intervalTime = Math.max(500, intervalTime - 300); // Nunca menor a 500ms
  startGame();
}

// Iniciar el juego
startGame();
