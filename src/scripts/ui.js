export class UI {
    static get rows() {
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const row = document.querySelectorAll(`[data-row="${i}"]`);
            rows.push(row);
        }
        return rows;
    }

    static render(puzzle) {
        UI.rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const gridCell = puzzle.grid[rowIndex][cellIndex];

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
