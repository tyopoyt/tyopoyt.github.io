import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';
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
  cols = 6;
  numLandscape = 19;
  numPortrait = 7;

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
      this.photoTiles.push(new PhotoTile(src, preview, rows, cols));
    }

    for (let i = 0; i < this.numPortrait; i++) {
      const src = `assets/gallery/portrait/${i}.jpg`
      const preview = `assets/gallery/portrait/preview/${i}.jpg`;
      const rows = 6;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(src, preview, rows, cols));
    }
  }

  showLightbox(index: number) {
    this.lightbox.show(index);
  }
}
