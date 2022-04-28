import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { MinesweeperPageComponent } from './minesweeper-page/minesweeper-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full'
  },
  {
    path: 'minesweeper',
    component: MinesweeperPageComponent
  },
  {
    path: 'gallery',
    component: GalleryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
