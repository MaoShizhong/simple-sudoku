export class UI {
    static newGameButton = document.querySelector('#new-game');
    static grid = document.querySelector('#grid');
    static cells = UI.grid.querySelectorAll('.cell');
    static controls = document.querySelector('.controls');
    static numberControls = UI.controls.querySelectorAll('.values input');
    static boardStateControls = UI.controls.querySelectorAll('.misc button');
    static pencilModeButton = UI.controls.querySelector('#pencil-mode');

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

    static render(puzzle, currentNumber) {
        UI.rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const gridCell = puzzle.grid[rowIndex][cellIndex];

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
    }

    static highlightMatchingNumbers(currentNumber) {
        const highlightedCells = document.querySelectorAll('.highlight');
        highlightedCells.forEach((cell) => cell.classList.remove('highlight', 'conflict'));

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
}
