import '../styles/styles.css';
import Game from './game';
import { UI } from './ui';

const DIFFICULTIES = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
    expert: 'expert',
};

let game = new Game(DIFFICULTIES.easy);

UI.newGameButton.addEventListener('click', () => {
    game = new Game(DIFFICULTIES.easy);
});
UI.grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('value-entry')) {
        const { row, column } = event.target.parentElement.dataset;
        try {
            game.setValue(Number(row), Number(column));
        } catch {
            // Do nothing for now
        }
    }
});
UI.numberControls.forEach((button) => {
    button.addEventListener('change', (event) => {
        game.currentNumber = Number(event.target.value);
    });
});
UI.boardStateControls.forEach((button) => {
    button.addEventListener('click', () => {
        game.amendBoardState(button.id);
    });
});
UI.pencilModeButton.addEventListener('click', () => {
    game.togglePencilMode();
});
