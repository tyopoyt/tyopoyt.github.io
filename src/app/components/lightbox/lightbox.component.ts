import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  @Input() photos: PhotoTile[] = [];
  @Output() moreRequested = new EventEmitter<null>();

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

  downloadImage() {
    const anchor = document.createElement('a');
    anchor.href = this.photos[this.cur].fullsize;
    anchor.download = `img-${this.cur}`;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  }

  // show the next photo
  nextPhoto() {
    // when cur increments to photos.length it'll reset to 0
    this.cur = (this.cur + 1) % this.photos.length;

    if (this.cur >= this.photos.length - 2) {
      this.moreRequested.emit();
    }
  }

  // show the previous photo
  prevPhoto() {
    // when cur hits 0 we add photos.length to go back to the end
    this.cur = (this.cur - 1) + (this.cur ? 0 : this.photos.length);
  }

}
