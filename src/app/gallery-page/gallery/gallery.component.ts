import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';
import { ShuffleArrayPipe } from 'src/app/pipes/shuffle-array.pipe';
import { PHONE_WIDTH } from 'src/app/services/window-size.service';
import { LightboxComponent } from '../lightbox/lightbox.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @ViewChild('lightbox') lightbox: LightboxComponent;

  photoTiles: PhotoTile[] = [];
  sortedTiles: PhotoTile[] = [];
  cols = 6;
  numLandscape = 19;
  numPortrait = 7;
  sorting: string;
  shuffleArrayPipe = new ShuffleArrayPipe();

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > PHONE_WIDTH && this.cols < 6) {
      this.cols = 6;
    } else if (window.innerWidth <= PHONE_WIDTH && this.cols > 3) {
      this.cols = 3;
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.cols = window.innerWidth > PHONE_WIDTH ? 6 : 3;
    for (let i = 0; i < this.numLandscape; i++) {
      const src = `assets/gallery/landscape/${i}.jpg`
      const preview = `assets/gallery/landscape/preview/${i}.jpg`;
      const rows = 3;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(i, src, preview, rows, cols));
    }

    for (let i = 0; i < this.numPortrait; i++) {
      const src = `assets/gallery/portrait/${i}.jpg`
      const preview = `assets/gallery/portrait/preview/${i}.jpg`;
      const rows = 6;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(i, src, preview, rows, cols));
    }

    this.nextSort();
  }

  showLightbox(index: number) {
    this.lightbox.show(index);
  }

  nextSort() {
    if (this.sorting === 'shuffle') {
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return b.index - a.index} );
      this.sorting = 'asc';
    } else if (this.sorting === 'asc') {
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return a.index - b.index} );
      this.sorting = 'desc';
    } else {
      this.sortedTiles = this.shuffleArrayPipe.transform(this.photoTiles);
      this.sorting = 'shuffle';
    }
  }
}
