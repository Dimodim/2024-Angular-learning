import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageCopmonent {
  constructor(private _router: Router) {}

  onNavigate() {
    this._router.navigate([`/movies`]);
  }
}
