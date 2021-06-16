import { Point } from "./point.model";

export class Tile {
    mines: number;
    flagged: boolean;
    uncovered: boolean;
    clicked: boolean;
    coords: Point;

    constructor(tile?: Tile) {
        if (tile) {
            this.mines = tile.mines;
            this.flagged = tile.flagged;
            this.uncovered = tile.uncovered;
            this.clicked = tile.clicked;
            this.coords = tile.coords
        }
    }
}