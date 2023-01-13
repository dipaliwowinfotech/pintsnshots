import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profile!: FormGroup
  constructor(private api:ApiService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.profile = this.formBuilder.group({
      MOBILE_NO: ['', [Validators.required,
        Validators.pattern('[0-9].*'),
        Validators.minLength(10),
        Validators.maxLength(10)]],

        fullname: ['', [Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-za-z].*')]],

          EMAIL: ['', [Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('[0-9].*')]],
      })
}
  update(){
    this.profile.value

    const formData = new FormData();
    formData.set('country','India');
    formData.set('gender','Male');
    formData.set('expiry_date',' ');
    formData.set('mobile_no','9497676767');
    formData.set('passport_id','');
    formData.set('country_code','+91');
    formData.set('user_id','163');
    formData.set('dob','02-12-1997');
    formData.set('Aadhar_Emirates_ID','GCHVH6677V');
    formData.set('passport_expiry_date','00/0000');
    formData.set('action','profile_update');
    formData.set('fullname','02-bdbd-1997');
    formData.set('email','9497676767');
    this.api.profile(formData).subscribe((res:any)=>{
      console.log(res)
      this.profile = res.data;
    })

  }

}
