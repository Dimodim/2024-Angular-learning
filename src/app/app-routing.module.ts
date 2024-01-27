import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePageComponent } from './components/table-page/table-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';

const routes: Routes = [
  {
    path: '',
    component: TablePageComponent
  },
  {
    path: 'form-page/:id',
    component: FormPageComponent
  },
  {
    path: '**',
    component: TablePageComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
