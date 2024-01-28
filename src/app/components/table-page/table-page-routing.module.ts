import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './table-page.component';
import { MoviesResolver } from './movie-resolver/movie-resolver';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent,
    resolve: { moviesLoaded: MoviesResolver },
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablePageRoutingModule {}
