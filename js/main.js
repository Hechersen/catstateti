// Seleccionamos el tablero de juego
const tablero = document.getElementById("tablero");
// Seleccionamos las celdas del tablero
const boxes = tablero.querySelectorAll(".box");
// Creamos al jugador 
let currentPlayer = "X";
// Creamos los casilleros del tablero en forma de array
let gameBoard = ["", "", "", "", "", "", "", "", ""];
// Variables para llevar el seguimiento de las puntuaciones
let puntuacionX = 0;
let puntuacionO = 0;
// Creamos event listener para cada click en el tablero
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
});
// Creamos la funcion para los clicks en el tablero
function handleBoxClick(index) {    
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;

        const imgElement = document.querySelector(`.box[data-index="${index}"] img`);

        if (imgElement) {
            const imgPath = currentPlayer === "X" ? "./resources/x.png" : "./resources/o.png";

            // Actualizar directamente el atributo src de la imagen
            imgElement.src = imgPath;

            // Mostrar la imagen
            imgElement.style.display = "block";

            setTimeout(() => {
                if (checkWinner()) {
                    alert(`¡Jugador ${currentPlayer} ha ganado!`);
                    resetGame();
                } else if (isBoardFull()) {
                    alert("¡Es un empate!");
                    resetGame();
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }, 1);
        }
    }
}

// Función para renderizar en el tablero
function renderBoard() {
    boxes.forEach((box, index) => {
        box.textContent = gameBoard[index];
    });
}

// Función para detectar al ganador
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        // Verifica si todas las cajas en la combinación son del mismo jugador y no están vacías
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Verifica si todas las cajas en la combinación son iguales, no solo la primera y la última
            if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true; // Se ha formado una línea completa, declara la victoria
            }
        }
    }

    return false;
}

// Función para chequear si no queda espacio para jugar
function isBoardFull() {
    return gameBoard.every(cell => cell !== "");
}

// Función para actualizar el marcador en el DOM
function updateScore() {
    document.getElementById("puntuacionX").textContent = puntuacionX;
    document.getElementById("puntuacionO").textContent = puntuacionO;
}

// Función para empezar un nuevo juego
function resetGame() {    
    // Incrementar la puntuación del jugador correspondiente
    if (checkWinner()) {
        if (currentPlayer === "X") {
            puntuacionX++;
        } else if (currentPlayer === "O") {
            puntuacionO++;
        }
    }

    // Cambiar al siguiente jugador
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Restablecer el contenido de las imágenes y ocultarlas
    boxes.forEach((box) => {
        const imgElement = box.querySelector('img');
        if (imgElement) {
            imgElement.src = '';
            imgElement.style.display = 'none'; // Ocultar la imagen
        }
    });

    // Reiniciar el tablero
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Reiniciar el marcador
    updateScore();
}



