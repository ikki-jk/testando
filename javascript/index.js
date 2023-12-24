const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreButton = document.querySelector('.score');
const timeButton = document.querySelector('.tempo');
const restartButton = document.querySelector('.restart-btn');

let pipeCount = 0;
let timer = 0;
let interval;
let gameRunning = true;

const jump = () => {
    if (!gameRunning) return; // Impede que o jogador pule após perder
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const updateScore = () => {
    pipeCount++;
    scoreButton.querySelector('.pipe-count').textContent = pipeCount;
}

const updateTime = () => {
    if (gameRunning) {
        timer++;
        timeButton.querySelector('.time-counter').textContent = timer;
    }
}

const gameLoop = () => {
    interval = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ');

        if (pipePosition <= 105 && pipePosition > 0 && marioPosition < 40) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;
            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;
            mario.src = './imagens/fogog.png';
            clearInterval(interval);
            gameRunning = false;
            restartButton.style.display = 'block'; // Mostra o botão "Recomeçar"
        }
    }, 10);
}

const restartGame = () => {
    clearInterval(interval);
    pipeCount = 0;
    window.location.reload();
    timer = 0;
    scoreButton.querySelector('.pipe-count').textContent = pipeCount;
    timeButton.querySelector('.time-counter').textContent = timer;
    gameRunning = true;
    restartButton.style.display = 'none'; // Esconde o botão "Recomeçar"
    gameLoop(); 
}

gameLoop();

document.addEventListener('keydown', jump);
pipe.addEventListener('animationiteration', () => {
    updateScore();
});

setInterval(() => {
    updateTime();
}, 1000);

restartButton.addEventListener('click', restartGame);
