import Sudoku from 'sudoku-grid-maker';
import { getNewBoard } from './starting-values';
import { UI } from './ui';

export default class {
    #puzzle;
    #isPencilMode;
    #currentNumber;

    constructor(difficulty) {
        this.UI = new UI();

        this.#puzzle = new Sudoku(getNewBoard(difficulty));
        this.#isPencilMode = false;
        this.#currentNumber = 1;

        this.#render();
    }

    set currentNumber(value) {
        this.#currentNumber = value;
    }

    togglePencilMode() {
        this.#isPencilMode = !this.#isPencilMode;
    }

    setValue(row, column) {
        if (this.#isPencilMode) {
            if (Number.isNaN(this.#currentNumber)) {
                this.#puzzle.removePencilMark({
                    number: this.#currentNumber,
                    row,
                    column,
                });
            } else {
                this.#puzzle.addPencilMark({
                    number: this.#currentNumber,
                    row,
                    column,
                });
            }
        } else {
            if (Number.isNaN(this.#currentNumber)) {
                this.#puzzle.removeNumber({
                    row,
                    column,
                });
            } else {
                this.#puzzle.addNumber({
                    newNumber: this.#currentNumber,
                    row,
                    column,
                });
            }
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
                const gridCell = this.#puzzle.grid[rowIndex][cellIndex];

                cell.querySelector('.number').textContent = gridCell.value;

                const pencilCells = [
                    ...cell.querySelector('.pencils').children,
                ];
                pencilCells.forEach((pencilCell) => {
                    const pencilNumber = Number(pencilCell.dataset.number);
                    if (gridCell.pencilMarks.includes(pencilNumber)) {
                        pencilCell.textContent = pencilCell.dataset.number;
                    } else {
                        pencilCell.textContent = '';
                    }
                });
            });
        });
    }
}
