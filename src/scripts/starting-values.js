import { getSudoku } from 'sudoku-gen';

export function getNewBoard(difficulty) {
    const { puzzle } = getSudoku(difficulty);
    const values = [];
    let row = [];
    for (let i = 0; i < 81; i++) {
        row.push(Number(puzzle[i]) || null);
        const END_OF_ROW = (i + 1) % 9 === 0;
        if (END_OF_ROW) {
            values.push(row);
            row = [];
        }
    }
    return values;
}
