import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AstroGalleryPageComponent } from './astro-gallery-page/astro-gallery-page.component';
import { DigitalGalleryPageComponent } from './digital-gallery-page/digital-gallery-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { MinesweeperPageComponent } from './minesweeper-page/minesweeper-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'astro-gallery',
    pathMatch: 'full'
  },
  {
    path: 'minesweeper',
    component: MinesweeperPageComponent
  },
  {
    path: 'gallery',
    component: GalleryPageComponent
  },
  {
    path: 'astro-gallery',
    component: AstroGalleryPageComponent
  },
  {
    path: 'digital-gallery',
    component: DigitalGalleryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
