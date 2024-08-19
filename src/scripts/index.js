import '../styles/styles.css';
import Sudoku from './game';

const sudoku = new Sudoku();

const grid = document.querySelector('#grid');
grid.addEventListener('click', (event) => {
    if (event.target.classList.contains('value-entry')) {
        const { row, column } = event.target.parentElement.dataset;
        try {
            sudoku.setValue(Number(row), Number(column));
        } catch {
            // Do nothing for now
        }
    }
});

const numberControls = document.querySelectorAll('.controls > .values input');
numberControls.forEach((button) => {
    button.addEventListener('change', (event) => {
        sudoku.currentNumber = Number(event.target.value);
    });
});
