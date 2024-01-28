import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import * as fromStore from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore<fromStore.IState>;
  let router: Router;

  const mockActivatedRoute = {
    paramMap: of(new Map([['id', '1']])),
  };
  const mockMovieDetails = createMovieDetails();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        NoopAnimationsModule,
        MatButtonModule,
      ],
      declarations: [MovieDetailsComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    store.overrideSelector(fromStore.selectMovieDetailsState, mockMovieDetails);
    store.refreshState()

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getMovieDetails action on init with route param', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      fromStore.getMovieDetails({ payload: '1' })
    );
  });

  it('should dispatch clearMovieDetailsCache action on button click', () => {
    const clearCasheButton = fixture.debugElement.query(By.css('#clear-cashe-button')).nativeElement;
    clearCasheButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      fromStore.clearMovieDetailsCache()
    );
  });

  it('should navigate back to movies list on back click', () => {
    fixture.nativeElement.querySelector('#navigate-button').click();
    expect(router.navigate).toHaveBeenCalledWith(['movies']);
  });
});
