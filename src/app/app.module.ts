import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MinesweeperComponent } from './minesweeper-page/minesweeper/minesweeper.component';
import { ScorePipePipe } from './pipes/score-pipe.pipe';
import { MinesweeperPageComponent } from './minesweeper-page/minesweeper-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery-page/gallery/gallery.component';
import { ShuffleArrayPipe } from './pipes/shuffle-array.pipe';
import { LightboxComponent } from './gallery-page/lightbox/lightbox.component'

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    ScorePipePipe,
    MinesweeperPageComponent,
    GalleryPageComponent,
    NavbarComponent,
    GalleryComponent,
    ShuffleArrayPipe,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
