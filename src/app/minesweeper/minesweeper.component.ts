import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../models/tile.model';
import * as _ from 'lodash';

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
    console.log(this.board)
  }

  generateBoard(): void {
    for (let i = 0; i < this.rows; i++) {
      const rowTiles = []
      for (let j = 0; j < this.cols; j++) {
        rowTiles.push(new Tile({mines: 0, flagged: false, uncovered: false}))
      }
      this.board[i] = rowTiles;
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
          this.board[x][y].mines = this.findMines(x, y);
        }
      }
    }

  }

  findMines(x: number, y: number): number {
    let mines = 0;
    console.log('------------------------------------------------------')
    for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
      for (let colOffset = -1; colOffset < 2; colOffset++) {
        console.log(`${rowOffset}, ${colOffset}`)
        const neighborX = x + rowOffset;
        const neighborY = y + colOffset;
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        } else if ( neighborX < 0 || neighborX >= this.rows || neighborY < 0 || neighborY >= this.cols) {
          continue;
        } else {
          if (this.board[neighborX][neighborY].mines === -1) {
            mines += 1;
          } 
        }
      }
    }

    return mines;
  }

}
