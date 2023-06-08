import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() gallerySource: string = 'assets/film-gallery';
  @Input() numLandscape: number = 0;
  @Input() numPortrait: number = 0;

  photoTiles: PhotoTile[] = [];
  sortedTiles: PhotoTile[] = [];
  cols = 6;
  sorting: string;
  shuffleArrayPipe = new ShuffleArrayPipe();
  sortIcon: string = 'shuffle';
  sortText: string = 'Random';

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
      const src = `${this.gallerySource}/landscape/${i}.jpg`
      const preview = `${this.gallerySource}/landscape/preview/${i}.jpg`;
      const rows = 3;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(i, src, preview, rows, cols));
    }

    for (let i = 0; i < this.numPortrait; i++) {
      const src = `${this.gallerySource}/portrait/${i}.jpg`
      const preview = `${this.gallerySource}/portrait/preview/${i}.jpg`;
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
    if (this.sorting === 'shuffle') { // if shuffle, go to ascending
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return b.index - a.index} );
      this.sorting = 'desc';
      this.sortIcon = 'calendar-asc';
      this.sortText = 'Newest';
    } else if (this.sorting === 'desc') { // if ascending, go to descending
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return a.index - b.index} );
      this.sorting = 'asc';
      this.sortIcon = 'calendar-desc';
      this.sortText = 'Oldest'
    } else {// if descending, go to shuffle
      this.sortedTiles = this.shuffleArrayPipe.transform(this.photoTiles);
      this.sorting = 'shuffle';
      this.sortIcon = 'shuffle';
      this.sortText = 'Random'
    }
  }
}
