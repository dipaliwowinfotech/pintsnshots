import { Component, OnInit } from '@angular/core';
import {  FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
profile: FormGroup|any;
  verifiedUser: any;
  isSubmitted:boolean = false;
  isUs:boolean=false;
  Code: any;
  countrycode:any
  countryList:Array<any>=[{id:1,value: "India",code:'+91'},{id:2,value: "United States",code:'+881'}];
  constructor(private api:ApiService,private formBuilder:FormBuilder) { 
   // this.loginData();
  }

  ngOnInit(): void {
    this.createForm();  
    
   
}
get form() { return this.profile.controls; }

createForm(){
  this.loginData();
  this.profile = this.formBuilder.group({
    mobile_no: [this.verifiedUser.mobile_no, [Validators.required,
      Validators.pattern('[6-9]\\d{9}'),
      Validators.minLength(10),
      Validators.maxLength(10)]],

      fullname: [this.verifiedUser.fullname, [Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-z].*')]],

        email: [this.verifiedUser.email, [Validators.required,
         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          ]],

          dob: [this.verifiedUser.dob,],
          country: [this.verifiedUser.country,],
          pan: [this.verifiedUser.Aadhar_Emirates_ID,
          Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
          emiratesID: [this.verifiedUser.Aadhar_Emirates_ID,
            Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')],
          passport: [this.verifiedUser.passport_id,],
          countryCode: [this.verifiedUser.country_code,],
          gender: [this.verifiedUser.gender,],
          expiry_date: [this.verifiedUser.expiry_date,],
          passport_expiry_date: [this.verifiedUser.passport_expiry_date,],
    })
}

loginData(){
  this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
  console.log(this.verifiedUser);
}


onCountryChange(e:any){
  this.isUs = false;  
  this.Code = this.countryList.find((cntry: any) => cntry.value == e.target.value);
  //console.log(e.target.value);
  this.countrycode = this.Code.code;
console.log(this.countrycode);
if(e.target.value == "United States"){
  this.isUs = true;
  
  //this.profile.pan.clearValidators();
}
else{
  this.isUs = false;
}

}

  update(){
    this.isSubmitted = true;
    if(this.profile.valid){
      const form_Data = new FormData();
      form_Data.set('country',this.profile.value.country);
      form_Data.set('gender',this.profile.value.gender);
      form_Data.set('expiry_date',this.profile.value.expiry_date);
      form_Data.set('mobile_no',this.profile.value.mobile_no);
      form_Data.set('passport_id',this.profile.value.passport);
      form_Data.set('country_code',this.profile.value.countryCode);
      form_Data.set('user_id',this.verifiedUser.user_id);
      form_Data.set('dob',this.profile.value.dob);
      form_Data.set('Aadhar_Emirates_ID',this.profile.value.pan);
      form_Data.set('passport_expiry_date',this.profile.value.passport_expiry_date);
      form_Data.set('action','profile_update');
      form_Data.set('fullname',this.profile.value.fullname);
      form_Data.set('email',this.profile.value.email);
      this.api.profile(form_Data).subscribe((res:any)=>{
        console.log(res)
        //this.profile = res.data;
      });
    }
    this.profile.value
console.log(this.profile);
    

  }

}
