import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HomePageCopmonent } from './form-p
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { NoopAnimationPlayer } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageCopmonent } from './home-page.component';

describe('HomePageCopmonent', () => {
  let component: HomePageCopmonent;
  let fixture: ComponentFixture<HomePageCopmonent>;

  // const selectElement = (selector: string) => {
  //   return fixture.nativeElement.querySelector(selector);
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageCopmonent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageCopmonent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
