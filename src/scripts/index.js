import '../styles/styles.css';
import '../styles/themes.css';
import Game from './game';
import { UI } from './ui';

// remember theme preference if revisiting site
document.documentElement.dataset.theme =
    localStorage.getItem('theme') ?? 'light';

Game.currentGame = new Game();

UI.difficulty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        Game.difficulty = event.target.dataset.difficulty;
        Game.currentGame = new Game();
    }
});
UI.themeButton.addEventListener('click', () => {
    const { theme } = document.documentElement.dataset;
    document.documentElement.dataset.theme =
        theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', document.documentElement.dataset.theme);
});
UI.grid.addEventListener('click', (event) => {
    if (!event.target.classList.contains('value-entry')) {
        return;
    }

    const { row, column } = event.target.parentElement.dataset;
    try {
        Game.currentGame.setValue(Number(row), Number(column));
    } catch {
        const { box } = event.target.parentElement.parentElement.dataset;
        UI.highlightConflictingCells(row, column, box);
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
