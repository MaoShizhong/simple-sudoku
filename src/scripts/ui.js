export class UI {
    static difficulty = document.querySelector('.difficulty');
    static newGameButton = document.querySelector('#new-game');
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
        const localStorageDifficulty =
            localStorage.getItem('difficulty') ?? 'easy';
        UI.difficulty
            .querySelector(`#${localStorageDifficulty}`)
            .classList.add('selected');
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

    static render(puzzle, currentNumber) {
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

    static highlightConflictingCells() {
        UI.cells.forEach((cell) => {
            const conflictingCell = cell.querySelector(
                `.number[data-number="${UI.currentSelectedNumber}"]`
            );
            if (conflictingCell) {
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
            console.log(label)
            if (numberCounts[i] === 9) {
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
        }
    }

    static congratulatePlayer() {
        setTimeout(() => {
            const gameEndModal = this.createGameEndModal();
            document.body.appendChild(gameEndModal);
            gameEndModal.showModal();
        }, 0);
    }

    static createGameEndModal() {
        const modal = document.createElement('dialog');
        modal.id = 'congratulations';
        modal.innerHTML = `
            <button id="close">&times;</button>
            <h2>Congratulations!</h2>
            <p>You solved the puzzle!</p>
            <button>&gt; New game &lt;</button>
        `;

        modal.querySelector('#close').addEventListener('click', () => {
            modal.close();
        });
        modal
            .querySelector('button:not(#close)')
            .addEventListener('click', () => {
                modal.close();
                UI.newGameButton.click();
            });
        modal.addEventListener('close', () => {
            modal.remove();
        });

        return modal;
    }
}
