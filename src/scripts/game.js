import Sudoku from 'sudoku-grid-maker';
import { getNewBoard } from './starting-values';
import { UI } from './ui';

export default class {
    #puzzle;
    #isPencilMode;
    #currentNumber;

    constructor(difficulty) {
        this.#puzzle = new Sudoku(getNewBoard(difficulty));
        this.#isPencilMode = false;
        this.#currentNumber = 1;

        UI.render(this.#puzzle);
    }

    set currentNumber(value) {
        this.#currentNumber = value;
    }

    togglePencilMode() {
        this.#isPencilMode = !this.#isPencilMode;
    }

    setValue(row, column) {
        if (this.#isPencilMode) {
            this.#puzzle.togglePencilMark({
                number: this.#currentNumber,
                row,
                column,
            });
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

        UI.render(this.#puzzle);
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
        UI.render(this.#puzzle);
    }
}
