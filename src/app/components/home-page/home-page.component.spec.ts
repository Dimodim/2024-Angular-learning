import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPageComponent } from './form-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationPlayer } from '@angular/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormPageComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  const selectElement = (selector: string) => {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPageComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({ name: 'name', link: 'test.com' });
  });

  it('should display submit mesage', () => {
    selectElement('#submit-button').click();
    fixture.detectChanges();
    component.submit();
    expect(component.submitted).toBeTruthy();
    expect(selectElement('#submitted-message')).toBeTruthy();
  });

  it('should not show submit message', () => {
    const submittedMessage =
      fixture.nativeElement.querySelector('#submited-message');
    expect(submittedMessage).toBeFalsy();
  });
});
