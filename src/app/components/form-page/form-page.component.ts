import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent {
  form = this._fb.group({
    name: 'name',
    link: 'test.com',
  });

  submitted = false

  constructor(private _fb: FormBuilder,) {}
  
  submit(){
    this.submitted = true
  }
}
