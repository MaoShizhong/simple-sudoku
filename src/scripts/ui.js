export class UI {
    static newGameButton = document.querySelector('#new-game');
    static grid = document.querySelector('#grid');
    static controls = document.querySelector('.controls');
    static numberControls = UI.controls.querySelectorAll('.values input');
    static boardStateControls = UI.controls.querySelectorAll('button');
    static pencilModeButton = UI.controls.querySelector('#pencil-mode');

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
        highlightedCells.forEach((cell) => cell.classList.remove('highlight'));

        const matchingNumbers = document.querySelectorAll(
            `.cell:has(.number[data-number="${currentNumber}"]), .pencils > [data-number="${currentNumber}"][data-visible="true"]`
        );
        matchingNumbers.forEach((cell) => {
            cell.classList.add('highlight');
        });
    }
}
