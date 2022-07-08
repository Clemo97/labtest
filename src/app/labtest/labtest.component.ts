import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LabtestService } from '..//labtest.service';




@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.css']
})
export class LabtestComponent implements OnInit {

  labtestForm!: FormGroup;




  get userName() {
    return this.labtestForm.get('userName');
  }
  //Inject FormBuilder Service
  constructor(private fb: FormBuilder, private _labtestService: LabtestService) { }

  //ngOnInit lifecycle hook
  ngOnInit() {
    this.labtestForm = this.fb.group({
      userName: ['Clement', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [''],
      testType: [''],
      gender: [''],
      mobilePhone: [''],

    });
  }



  loadApiData() {
    this.labtestForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
    });
  }
  onSubmit() {
    console.log(this.labtestForm.value);
    this._labtestService.register(this.labtestForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
  }

}
