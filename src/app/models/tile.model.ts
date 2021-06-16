export class Tile {
    mines: number;
    flagged: boolean;
    uncovered: boolean;
    x: number;
    y: number;

    constructor(tile?: Tile) {
        if (tile) {
            this.mines = tile.mines;
            this.flagged = tile.flagged;
            this.uncovered = tile.uncovered;
            this.x = tile.x;
            this.y = tile.y;
        }
    }
}