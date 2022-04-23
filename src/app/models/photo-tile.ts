export class PhotoTile {
    src: string;
    preview: string;
    rows: number;
    cols: number;

    constructor(src: string, preview: string, rows: number, cols: number) {
        this.src = src;
        this.preview = preview;
        this.rows = rows;
        this.cols = cols;
    }
}