import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../models/tile.model';
import * as _ from 'lodash';
import { Point } from '../models/point.model';
import { Subscription, timer } from 'rxjs';

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
  gameOver: boolean;
  gameWon: boolean;
  uncoveredTiles: number;
  mineTiles: Tile[];
  secondsPassed: number;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  minesMarked: number;

  timerSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.generateBoard();
  }

  generateBoard(): void {
    this.gameOver = false;
    this.gameWon = false;
    this.uncoveredTiles = 0;
    this.mineTiles = [];
    this.secondsPassed = 0;
    this.minesMarked = 0;

    for (let x = 0; x < this.rows; x++) {
      const rowTiles = []
      for (let y = 0; y < this.cols; y++) {
        rowTiles.push(new Tile({mines: 0, flagged: false, uncovered: false, clicked: false, coords: new Point(x, y)}))
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
      const row = Math.floor(tile/this.cols);
      const col = tile % this.cols;
      this.board[row][col].mines = -1;
      this.mineTiles.push(this.board[row][col]);
    }

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        if (this.board[x][y].mines > -1) {
          this.board[x][y].mines = this.visitNeighbors(VisitPurpose.mines, new Point(x, y));
        }
      }
    }

  }

  visitNeighbors(purpose: VisitPurpose, coords: Point): number {
    let mines = 0;
    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        const neighborX = coords.x + rowOffset;
        const neighborY = coords.y + colOffset;
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        } else if ( neighborX < 0 || neighborX >= this.rows || neighborY < 0 || neighborY >= this.cols) {
          continue;
        } else {
          // visit neighbors in correct way
          if (purpose === VisitPurpose.mines && this.board[neighborX][neighborY].mines === -1) {
            mines += 1;
          } else if (purpose === VisitPurpose.reveal) {
            if (this.board[coords.x][coords.y].mines > -1) {
              if (!this.board[coords.x][coords.y].uncovered) {
                this.uncoverTile(this.board[coords.x][coords.y]);
              }
              if (this.board[coords.x][coords.y].mines === 0 && !this.board[neighborX][neighborY].uncovered && !this.board[neighborX][neighborY].flagged) {
                this.visitNeighbors(VisitPurpose.reveal, new Point(neighborX, neighborY))
              }
            }
          }
        }
      }
    }
    return mines;
  }

  tileClicked(tile: Tile): void {
    if (!(tile.flagged || tile.uncovered || this.gameWon || this.gameOver)) {
      if (this.uncoveredTiles === 0) {
        this.timerSubscription = timer(0, 1000).subscribe(n => {
          this.secondsPassed = n;
          this.seconds = n % 60;
          this.minutes = Math.floor(n / 60);
          this.hours = Math.floor(n / 3600);
        });
      }

      tile.clicked = true;
      this.uncoverTile(tile);

      if (tile.mines === -1) {
        this.timerSubscription.unsubscribe();
        this.gameOver = true;
        this.revealMines();
      }

      if (tile.mines === 0) {
        this.visitNeighbors(VisitPurpose.reveal, new Point(tile.coords.x, tile.coords.y))
      }
    }
  }

  tileFlagged(tile: Tile): false {
    if (!(this.gameWon || this.gameOver)) {
      tile.flagged = !tile.flagged;

      if (!tile.uncovered) {
        if (tile.flagged) {
          this.minesMarked++;
        } else {
          this.minesMarked--;
        }
      }

    }
    return false;
  }

  uncoverTile(tile: Tile): void {
    tile.uncovered = true;
    this.uncoveredTiles++;

    if (this.uncoveredTiles === (this.rows * this.cols) - this.mines) {
      this.timerSubscription.unsubscribe();
      this.gameWon = true;
      this.minesMarked = this.mines;
      this.revealMines();
    }
  }

  revealMines(): void {
    for (const mine of this.mineTiles) {
      mine.uncovered = true;
    }
  }

  revealAll(): void {
    for (const row of this.board) {
      for (const tile of row) {
        tile.uncovered = true;

      }
    }
  }

}
