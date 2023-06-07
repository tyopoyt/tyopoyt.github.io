import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  active: string = 'minesweeper';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.active = this.router.url.split('/').pop() || 'gallery';
  }

  navTo(page: string): void  {
    this.active = page;
    this.router.navigate([page])
  }

}
