import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('mine', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mine.svg'));
    this.matIconRegistry.addSvgIcon('flag', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/flag.svg'));
    this.matIconRegistry.addSvgIcon('cancel', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/cancel.svg'));
    this.matIconRegistry.addSvgIcon('chevron-right', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/chevron-right.svg'));
    this.matIconRegistry.addSvgIcon('chevron-left', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/chevron-left.svg'));
    this.matIconRegistry.addSvgIcon('chevron-up', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/chevron-up.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/close.svg'));
    this.matIconRegistry.addSvgIcon('shuffle', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/shuffle-variant.svg'));
    this.matIconRegistry.addSvgIcon('calendar-asc', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sort-calendar-ascending.svg'));
    this.matIconRegistry.addSvgIcon('calendar-desc', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/sort-calendar-descending.svg'));
    this.matIconRegistry.addSvgIcon('download', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/download.svg'));
  }
}
