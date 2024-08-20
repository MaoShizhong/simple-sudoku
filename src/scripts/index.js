import '../styles/styles.css';
import Game from './game';
import { UI } from './ui';

Game.currentGame = new Game();

UI.difficulty.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    UI.difficulty.querySelector('.selected').classList.remove('selected');

    event.target.classList.add('selected');
    Game.setDifficulty(event.target.id);
});
UI.newGameButton.addEventListener('click', () => {
    Game.currentGame = new Game();
});
UI.grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('value-entry')) {
        const { row, column } = event.target.parentElement.dataset;
        try {
            Game.currentGame.setValue(Number(row), Number(column));
        } catch {
            UI.highlightConflictingCells();
        }
    }
});
UI.numberControls.forEach((button) => {
    button.addEventListener('change', (event) => {
        Game.currentGame.currentNumber = Number(event.target.value);
    });
});
UI.boardStateControls.forEach((button) => {
    button.addEventListener('click', () => {
        Game.currentGame.amendBoardState(button.id);
    });
});
UI.pencilModeButton.addEventListener('click', () => {
    Game.currentGame.togglePencilMode();
});
