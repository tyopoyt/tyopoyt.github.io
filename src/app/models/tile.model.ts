export class Tile {
    mines: number;
    flagged: boolean;
    uncovered: boolean;

    constructor(tile?: Tile) {
        if (tile) {
            this.mines = tile.mines;
            this.flagged = tile.flagged;
            this.uncovered = tile.uncovered;
        }
    }
}