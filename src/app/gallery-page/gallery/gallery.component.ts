import { Component, OnInit } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  photoTiles: PhotoTile[] = [];
  cols = 6; 
  numLandscape = 18;
  numPortrait = 5;

  constructor() { }

  ngOnInit(): void {
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
}
