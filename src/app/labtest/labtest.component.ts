import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LabtestService } from '..//labtest.service';


@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.css']
})
export class LabtestComponent implements OnInit {

  //Iniate the Reactive Form, assign the FormGroup to a form variable.
  labtestForm!: FormGroup;

  CountryData: Array<any> = [
    { name: 'IND', value: 'India' },
    { name: 'AUS', value: 'Australia' },
    { name: 'USA', value: 'America' },
    { name: 'RUS', value: 'Rusia' },
    { name: 'Eng', value: 'England' }
  ];

  get userName() {
    return this.labtestForm.get('userName');
  }
  //Inject FormBuilder Service, create main form object and bind it to FormBuilder.
  constructor(private fb: FormBuilder, private _labtestService: LabtestService) { }

  //ngOnInit lifecycle hook
  ngOnInit() {
    this.labtestForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [''],
      checkArray: this.fb.array([]),
      gender: [''],
      mobilePhone: [''],

    });
  }

  //multiple checkboxes
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.labtestForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log("Checkbox");

    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }



  loadApiData() {
    this.labtestForm.setValue({
      userName: 'Brucey',
      dateOfBirth: '12/12/2012',
      checkArray: ['India'],
      gender: 'female',
      mobilePhone: '0727284935'
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
