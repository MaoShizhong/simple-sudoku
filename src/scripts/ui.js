export class UI {
    static difficulty = document.querySelector('.difficulty');
    static themeButton = document.querySelector('#theme');
    static grid = document.querySelector('#grid');
    static cells = UI.grid.querySelectorAll('.cell');
    static controls = document.querySelector('.controls');
    static numberControls = UI.controls.querySelectorAll('.values input');
    static boardStateControls = UI.controls.querySelectorAll('.misc button');
    static pencilModeButton = UI.controls.querySelector('#pencil-mode');

    // Initialise some UI elements
    static {
        UI.cells.forEach((cell) => {
            cell.addEventListener('animationend', () => {
                cell.classList.remove('conflict');
            });
        });
    }

    static get currentSelectedNumber() {
        const selectedNumber = [...UI.numberControls].find(
            (number) => number.checked
        );
        return Number(selectedNumber.value);
    }

    static get rows() {
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const row = document.querySelectorAll(`[data-row="${i}"]`);
            rows.push(row);
        }
        return rows;
    }

    static render(puzzle, currentNumber, isInitialRender = false) {
        const placedNumbers = {};

        UI.rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const gridCell = puzzle.grid[rowIndex][cellIndex];

                // Count the number of times each number is placed to mark when complete
                placedNumbers[gridCell.value] =
                    (placedNumbers[gridCell.value] ?? 0) + 1;

                const cellValue = cell.querySelector('.number');
                cellValue.textContent = gridCell.value;
                cellValue.dataset.number = gridCell.value;
                if (isInitialRender && gridCell.value) {
                    cellValue.classList.add('original');
                } else if (isInitialRender) {
                    cellValue.classList.remove('original');
                }

                const pencilCells = [
                    ...cell.querySelector('.pencils').children,
                ];
                pencilCells.forEach((pencilCell) => {
                    const pencilNumber = Number(pencilCell.dataset.number);
                    if (gridCell.pencilMarks.includes(pencilNumber)) {
                        pencilCell.textContent = pencilCell.dataset.number;
                        pencilCell.dataset.visible = true;
                    } else {
                        pencilCell.textContent = '';
                        pencilCell.dataset.visible = null;
                    }
                });
            });
        });

        UI.highlightMatchingNumbers(currentNumber);
        UI.markCompletedNumbers(placedNumbers);
    }

    static highlightMatchingNumbers(currentNumber) {
        const highlightedCells = document.querySelectorAll('.highlight');
        highlightedCells.forEach((cell) =>
            cell.classList.remove('highlight', 'conflict')
        );

        const matchingNumbers = document.querySelectorAll(
            `.cell:has(.number[data-number="${currentNumber}"]), .pencils > [data-number="${currentNumber}"][data-visible="true"]`
        );
        matchingNumbers.forEach((cell) => {
            cell.classList.add('highlight');
        });
    }

    static highlightConflictingCells(targetRow, targetColumn, targetBox) {
        UI.cells.forEach((cell) => {
            const { row, column } = cell.dataset;
            const { box } = cell.parentElement.dataset;

            const conflictingPosition =
                targetRow === row ||
                targetColumn === column ||
                targetBox === box;
            const conflictingNumber = cell.querySelector(
                `.number[data-number="${UI.currentSelectedNumber}"]`
            );

            if (conflictingNumber && conflictingPosition) {
                cell.classList.remove('conflict');
                // timeout to force repaint before adding class back, else no animation
                setTimeout(() => cell.classList.add('conflict'), 0);
            }
        });
    }

    static markCompletedNumbers(numberCounts) {
        for (let i = 1; i <= 9; i++) {
            // 1-indexed loop
            const label = UI.numberControls[i - 1].parentElement;
            if (numberCounts[i] === 9) {
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
        }
    }

    static congratulatePlayer(puzzleDifficulty) {
        // timeout to allow the final number to be rendered before modal
        setTimeout(() => {
            const gameEndModal = this.createGameEndModal(puzzleDifficulty);
            document.body.appendChild(gameEndModal);
            gameEndModal.showModal();
        }, 0);
    }

    static createGameEndModal(puzzleDifficulty) {
        const modal = document.createElement('dialog');
        modal.id = 'congratulations';
        modal.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You solved the puzzle!</p>
            <button>&gt; New game &lt;</button>
        `;

        modal.querySelector('button').addEventListener('click', () => {
            modal.close();
            UI.difficulty
                .querySelector(`[data-difficulty="${puzzleDifficulty}"]`)
                .click();
        });
        modal.addEventListener('close', () => {
            modal.remove();
        });

        return modal;
    }
}
