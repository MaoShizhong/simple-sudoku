import Sudoku from 'sudoku-grid-maker';
import { UI } from './ui';

export default class {
    #puzzle;
    #isPencilMode;
    #currentNumber;

    constructor() {
        this.UI = new UI();

        this.#puzzle = new Sudoku();
        this.#isPencilMode = false;
        this.#currentNumber = 1;
    }

    set currentNumber(value) {
        this.#currentNumber = value;
    }

    setValue(row, column) {
        if (Number.isNaN(this.#currentNumber)) {
            this.#puzzle.removeNumber({ row, column });
        } else {
            this.#puzzle.addNumber({
                newNumber: this.#currentNumber,
                row,
                column,
            });
        }

        this.#render();
    }

    amendBoardState(action) {
        switch (action) {
            case 'undo':
                this.#puzzle.undo();
                break;
            case 'redo':
                this.#puzzle.redo();
                break;
            case 'reset':
                this.#puzzle.reset();
                break;
            default:
                break;
        }
        this.#render();
    }

    #render() {
        this.UI.rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                cell.querySelector('.number').textContent =
                    this.#puzzle.grid[rowIndex][cellIndex].value;
            });
        });
    }
}
