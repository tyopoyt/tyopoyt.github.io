import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  photoTiles: any[] = [];
  cols = 2; 
  numPhotos = 19;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.numPhotos; i++) {
      this.photoTiles.push(`assets/gallery/${i}.jpg`);
    }
  }

}
