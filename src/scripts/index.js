import '../styles/styles.css';
import Game from './game';

const DIFFICULTIES = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
    expert: 'expert',
};

const newGameButton = document.querySelector('#new-game');
const grid = document.querySelector('#grid');
const controls = document.querySelector('.controls');
const numberControls = controls.querySelectorAll('.values input');
const boardStateControls = controls.querySelectorAll('button');
const pencilModeButton = controls.querySelector('#pencil-mode');

let game = new Game(DIFFICULTIES.easy);

newGameButton.addEventListener('click', () => {
    game = new Game(DIFFICULTIES.easy);
});
grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('value-entry')) {
        const { row, column } = event.target.parentElement.dataset;
        try {
            game.setValue(Number(row), Number(column));
        } catch {
            // Do nothing for now
        }
    }
});
numberControls.forEach((button) => {
    button.addEventListener('change', (event) => {
        game.currentNumber = Number(event.target.value);
    });
});
boardStateControls.forEach((button) => {
    button.addEventListener('click', () => {
        game.amendBoardState(button.id);
    });
});
pencilModeButton.addEventListener('click', () => {
    game.togglePencilMode();
});
