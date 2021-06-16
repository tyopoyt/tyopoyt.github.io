import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../models/tile.model';
import * as _ from 'lodash';

export enum VisitPurpose {
  mines = 'mines',
  reveal = 'reveal'
}

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

  @Input() rows: number = 8;
  @Input() cols: number = 8;
  @Input() mines: number = 10;

  board: Tile[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateBoard();
  }

  generateBoard(): void {
    for (let x = 0; x < this.rows; x++) {
      const rowTiles = []
      for (let y = 0; y < this.cols; y++) {
        rowTiles.push(new Tile({mines: 0, flagged: false, uncovered: false, x: x, y: y}))
      }
      this.board[x] = rowTiles;
    }

    if (this.mines > this.rows * this.cols) {
      console.log('Too many mines.');
      return;
    }

    const mineTiles = new Set<number>();

    while (mineTiles.size < this.mines) {
      mineTiles.add(Math.floor((Math.random() * this.rows * this.cols)));
    }

    for (const tile of mineTiles) {
      this.board[Math.floor(tile/this.cols)][tile % this.cols].mines = -1;
    }

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        if (this.board[x][y].mines > -1) {
          this.board[x][y].mines = this.visitNeighbors(VisitPurpose.mines, x, y);
        }
      }
    }

  }

  visitNeighbors(purpose: VisitPurpose, x: number, y: number): number {
    let mines = 0;
    // const neighborsToVisit = [];
    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        const neighborX = x + rowOffset;
        const neighborY = y + colOffset;
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        } else if ( neighborX < 0 || neighborX >= this.rows || neighborY < 0 || neighborY >= this.cols) {
          continue;
        } else {
          if (purpose === VisitPurpose.mines && this.board[neighborX][neighborY].mines === -1) {
            mines += 1;
          } else if (purpose === VisitPurpose.reveal) {
            if (this.board[x][y].mines > -1) {
              this.board[x][y].uncovered = true;
              if (this.board[x][y].mines === 0 && !this.board[neighborX][neighborY].uncovered && !this.board[neighborX][neighborY].flagged) {
                this.visitNeighbors(VisitPurpose.reveal, neighborX, neighborY)
              }
            }
          }
        }
      }
    }
    return mines;
  }

  tileClicked(tile: Tile): void {
    if (!tile.flagged) {
      tile.uncovered = true;
      if (tile.mines === 0) {
        this.visitNeighbors(VisitPurpose.reveal, tile.x, tile.y)
      }
    }
  }

  tileFlagged(tile: Tile): false {
    if (!tile.uncovered) {
      tile.flagged = !tile.flagged;
    }
    return false;
  }

}
