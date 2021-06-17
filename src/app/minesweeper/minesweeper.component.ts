import { Component, HostListener, Input, OnInit } from '@angular/core';
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

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key === ' ') {
      if (this.gameOver || this.gameWon) {
        this.generateBoard();
      } else {
        if (this.paused) { // resume
          let now = Date.now().valueOf();
          console.log(now - this.timePaused)
          this.totalPauseTime += now - this.timePaused;
          this.initTimerSub();
        } else { // pause
          this.timePaused = Date.now().valueOf();
          this.timerSubscription.unsubscribe();
        }
        this.paused = !this.paused;
      }
    }
  }

  @Input() rows: number = 8;
  @Input() cols: number = 8;
  @Input() mines: number = 10;

  // game state
  board: Tile[][] = []; // the game board
  gameOver: boolean;
  gameWon: boolean;
  paused: boolean;
  mineTiles: Tile[];
  uncoveredTiles: number;
  minesMarked: number;

  // time info
  timeStarted: number; // time game was started
  timePaused: number; // time the game was paused
  totalPauseTime: number; // how long game has been paused
  centiseconds: number = 0; // hundredths of a second to display
  seconds: number = 0; //seconds to display
  minutes: number = 0; // minutes to display
  hours: number = 0; // hours to display  

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
    this.totalPauseTime = 0;
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.minesMarked = 0;
    this.paused = false;

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
        this.timeStarted = Date.now().valueOf();
        this.initTimerSub();
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

  initTimerSub(): void {
    this.timerSubscription = timer(10, 10).subscribe(() => {
      // update time values
      let now = Date.now().valueOf();
      let timePlayed = now - this.timeStarted - this.totalPauseTime;
      this.centiseconds = Math.floor((timePlayed / 10) % 100);
      this.seconds = Math.floor((timePlayed / 1000) % 60)
      this.minutes = Math.floor((timePlayed / 60000) % 60);
      this.hours = Math.floor(timePlayed / 3600000)
    });
  }

  revealAll(): void {
    for (const row of this.board) {
      for (const tile of row) {
        tile.uncovered = true;

      }
    }
  }

}
