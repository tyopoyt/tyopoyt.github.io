import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { PhotoTile } from 'src/app/models/photo-tile';
import { ShuffleArrayPipe } from 'src/app/pipes/shuffle-array.pipe';
import { PHONE_WIDTH } from 'src/app/services/window-size.service';
import { LightboxComponent } from '../lightbox/lightbox.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @ViewChild('lightbox') lightbox: LightboxComponent;
  @ViewChild('listContainer') listContainer: ElementRef;
  @Input() gallerySource: string = 'assets/film-gallery';
  @Input() numLandscape: number = 0;
  @Input() numPortrait: number = 0;
  @Input() defaultSort: string = 'shuffle';

  photoTiles: PhotoTile[] = [];
  sortedTiles: PhotoTile[] = [];
  shownTiles: PhotoTile[] = [];
  tileChunk = 15;
  cols = 6;
  sorting: string;
  shuffleArrayPipe = new ShuffleArrayPipe();
  sortIcon: string = 'shuffle';
  sortText: string = 'Random';
  atTop = true;
  narrowDevice = false;

  // This is terrible but I don't have time to fix it right now
  initialSortMap = {
    'shuffle': 'asc',
    'desc': 'shuffle',
    'asc': 'desc'
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth > PHONE_WIDTH && this.cols < 6) {
      this.cols = 6;
    } else if (window.innerWidth <= PHONE_WIDTH && this.cols > 3) {
      this.cols = 3;
    }
    this.narrowDevice = window.innerWidth / window.innerHeight < 0.438
  }

  constructor() {}

  ngOnInit(): void {
    this.cols = window.innerWidth > PHONE_WIDTH ? 6 : 3;
    this.narrowDevice = window.innerWidth / window.innerHeight < 0.5
    for (let i = 0; i < this.numLandscape; i++) {
      const src = `${this.gallerySource}/landscape/${i}.jpg`
      const preview = `${this.gallerySource}/landscape/preview/${i}.jpg`;
      const fullsize = `${this.gallerySource}/landscape/fullsize/${i}.jpg`;
      const rows = 3;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(i, src, preview, fullsize, rows, cols));
    }

    for (let i = 0; i < this.numPortrait; i++) {
      const src = `${this.gallerySource}/portrait/${i}.jpg`
      const preview = `${this.gallerySource}/portrait/preview/${i}.jpg`;
      const fullsize = `${this.gallerySource}/portrait/fullsize/${i}.jpg`;
      const rows = 6;
      const cols = 3;
      this.photoTiles.push(new PhotoTile(i, src, preview, fullsize, rows, cols));
    }

    this.sorting = _.get(this.initialSortMap, this.defaultSort)
    this.nextSort(true);
  }

  onScroll() {
    const element = this.listContainer.nativeElement
  
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= (element.scrollHeight / 5)) {
      this.loadImageChunk();
    }

    this.atTop = element.scrollTop === 0;
  }

  loadImageChunk() {
    this.shownTiles.push(...this.sortedTiles.slice(this.shownTiles.length, this.shownTiles.length + this.tileChunk))
  }

  showLightbox(index: number) {
    this.lightbox.show(index);
  }

  scrollToTop() {
    this.listContainer.nativeElement.scrollTo({'top': 0, 'left': 0, 'behavior': 'smooth'});
  }

  nextSort(initialLoad: boolean = false) {
    if(!initialLoad) {
      this.scrollToTop();
    }
  
    if (this.sorting === 'shuffle') { // if shuffle, go to ascending
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return b.index - a.index} );
      this.shownTiles = this.sortedTiles.slice(0, this.tileChunk);
      this.sorting = 'desc';
      this.sortIcon = 'calendar-asc';
      this.sortText = 'Newest';
    } else if (this.sorting === 'desc') { // if ascending, go to descending
      this.sortedTiles = this.photoTiles.sort((a: PhotoTile, b: PhotoTile) => {return a.index - b.index} );
      this.shownTiles = this.sortedTiles.slice(0, this.tileChunk);
      this.sorting = 'asc';
      this.sortIcon = 'calendar-desc';
      this.sortText = 'Oldest'
    } else {// if ascending, go to shuffle
      this.sortedTiles = this.shuffleArrayPipe.transform(this.photoTiles);
      this.shownTiles = this.sortedTiles.slice(0, this.tileChunk);
      this.sorting = 'shuffle';
      this.sortIcon = 'shuffle';
      this.sortText = 'Random'
    }
  }
}
