const canvasWidth = 300;
const canvasHeight = 300;
const cellSize = 20;
const cellInRow = canvasWidth / cellSize;
const cellInCol = canvasHeight / cellSize;
let canvas = document.getElementById('game-canvas');
let scoreh3 = document.getElementById('h3score');
let score = 0;
scoreh3.textContent = 0;
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
var ctx = canvas.getContext('2d');
let way = 2;


let snake = [
    [0, 0],
    [0, -1],
    [0, -2]
]
let apple = [getRandom(cellInRow), getRandom(cellInCol)]
let k = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    k++
    if (k < 8) {
        return
    }
    k = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawApple();
    drawSnake();
}
requestAnimationFrame(gameLoop);

function restartGame() {
    snake = [
        [0, 0],
        [0, -1],
        [0, -2]
    ]
    apple = [getRandom(cellInRow), getRandom(cellInCol)]
    score = 0;
    scoreh3.textContent = 0;
    way = 1;

}




function drawApple() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(apple[0] * cellSize + (10), apple[1] * cellSize + (10), 8, 0, 2 * Math.PI);
    ctx.fill();
}

function drawSnake() {

    switch (way) {
        case 1:
            snake.unshift([snake[0][0], snake[0][1] - 1])
            if (snake[0][1] < 0) {
                snake[0][1] = snake[0][1] + cellInCol
            }

            break;

        case 2:
            snake.unshift([snake[0][0] + 1, snake[0][1]])
            if (snake[0][0] >= cellInRow) {
                snake[0][0] = snake[0][0] - cellInRow
            }
            break;
        case 3:
            snake.unshift([snake[0][0], snake[0][1] + 1])
            if (snake[0][1] >= cellInCol) {
                snake[0][1] = snake[0][1] - cellInCol
            }
            break;

        case 4:
            snake.unshift([snake[0][0] - 1, snake[0][1]])
            if (snake[0][0] < 0) {
                snake[0][0] = snake[0][0] + cellInRow
            }
            break;

        default:
            break;

    }

    if (apple[0] == snake[0][0] && apple[1] == snake[0][1]) {
        apple = [getRandom(cellInRow), getRandom(cellInCol)]
        scoreh3.textContent = ++score;
        //todo generate new position not on snake
    } else {
        snake.pop();
    }

    ctx.beginPath();
    ctx.fillStyle = '#B69CEA';
    ctx.fillRect(snake[0][0] * cellSize, snake[0][1] * cellSize, cellSize, cellSize)

    ctx.fillStyle = '#954FB6';
    for (let i = 1; i < snake.length; i++) {
        ctx.fillRect(snake[i][0] * cellSize, snake[i][1] * cellSize, cellSize, cellSize)
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
            restartGame();
        }
    }
    ctx.fill();
}




document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "ArrowUp":
            if (way !== 3) {
                way = 1;
            }
            break;

        case "ArrowRight":
            if (way !== 4) {
                way = 2;
            }
            break;
        case "ArrowDown":
            if (way !== 1) {
                way = 3;
            }
            break;

        case "ArrowLeft":
            if (way !== 2) {
                way = 4;
            }
            break;

        default:
            break;

    }
});


function getRandom(max) {

    return Math.floor(Math.random() * (max - 0)) + 0;
}
//todo rewrite in functions / classes
//todo change speed looking at score ???
//todo working buttons
//todo add w a s d ??
//todo stop when fail ??
//todo design
//todo generate new position not on snake