export class UI {
    static instance = null;

    constructor() {
        return UI.instance ?? this;
    }

    get rows() {
        const rows = [];
        for (let i = 0; i < 9; i++) {
            const row = document.querySelectorAll(`[data-row="${i}"]`);
            rows.push(row);
        }
        return rows;
    }
}
