import { HostListener, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderedPair } from '../models/ordered-pair';

export const PHONE_WIDTH = 800;
export const TABLET_WIDTH = 1100;

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {

  constructor() {}
}
