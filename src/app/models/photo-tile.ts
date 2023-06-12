export class PhotoTile {
    index: number;
    src: string;
    preview: string;
    fullsize: string;
    rows: number;
    cols: number;

    constructor(index: number, src: string, preview: string, fullsize: string, rows: number, cols: number) {
        this.index = index;
        this.src = src;
        this.preview = preview;
        this.fullsize = fullsize;
        this.rows = rows;
        this.cols = cols;
    }
}