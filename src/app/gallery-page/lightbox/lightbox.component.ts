import { Component, Input, OnInit } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() photos: PhotoTile[] = [];

  cur: number = 0;
  _show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public show(index: number = 0) {
    this.cur = index;
    this._show = true;
  }

  hide() {
    this._show = false;
  }

  // show the next photo
  nextPhoto() {
    // when cur increments to photos.length it'll reset to 0
    this.cur = (this.cur + 1) % this.photos.length;
  }

  // show the previous photo
  prevPhoto() {
    // when cur hits 0 we add photos.length to go back to the end
    this.cur = (this.cur - 1) + (this.cur ? 0 : this.photos.length);
  }

}
