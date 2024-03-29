import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablePageComponent } from './table-page.component';
import { TablePageRoutingModule } from './table-page-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
@NgModule({
  imports: [
    CommonModule,
    TablePageRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [TablePageComponent, MovieDetailsComponent],
})
export class TablePageModule {}
