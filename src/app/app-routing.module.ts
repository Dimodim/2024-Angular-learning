import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageCopmonent } from './components/home-page/home-page.component';
import { PreloadStrategyService } from 'src/services/preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageCopmonent,
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./components/table-page/table-page.module').then(
        (m) => m.TablePageModule
      ),
    data: { preload: true }
  },
  {
    path: '**',
    component: HomePageCopmonent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
