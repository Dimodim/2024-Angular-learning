import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { tableReducer } from './store/reducer';
import { TableEffects } from './store/effects';
import { TablePageComponent } from './components/table-page/table-page.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageCopmonent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, HomePageCopmonent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('tableFeature', tableReducer),
    EffectsModule.forFeature([TableEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
