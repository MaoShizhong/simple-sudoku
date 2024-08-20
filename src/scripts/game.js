import Sudoku from 'sudoku-grid-maker';
import { getNewBoard } from './starting-values';
import { UI } from './ui';

export default class Game {
    static #currentDifficulty = localStorage.getItem('difficulty') ?? 'easy';
    static currentGame;

    static set difficulty(newDifficulty) {
        Game.#currentDifficulty = newDifficulty;
        localStorage.setItem('difficulty', Game.#currentDifficulty);
    }

    #puzzle;
    #isPencilMode;
    #currentNumber;

    constructor() {
        this.#puzzle = new Sudoku(getNewBoard(Game.#currentDifficulty));
        this.#isPencilMode = false;
        this.#currentNumber = UI.currentSelectedNumber;

        UI.render(this.#puzzle, this.#currentNumber, true);
    }

    set currentNumber(value) {
        this.#currentNumber = value;
        UI.highlightMatchingNumbers(this.#currentNumber);
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

        UI.render(this.#puzzle, this.#currentNumber);

        if (this.#isSolved) {
            UI.congratulatePlayer();
        }
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
        UI.render(this.#puzzle, this.#currentNumber);
    }

    get #isSolved() {
        return this.#puzzle.grid.every((row) =>
            row.every((cell) => cell.value)
        );
    }
}
