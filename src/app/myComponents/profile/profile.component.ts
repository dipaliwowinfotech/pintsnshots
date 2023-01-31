import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import {  FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  countrycode:any;
  showDOB: boolean = true;
  selectedYear!: number;
  selectedMonth!: any;
  years: number[] = [];

  months:Array<any>=[{id:1,value: "January"},{id:2,value: "February"},{id:1,value: "March"},{id:1,value: "April"},{id:1,value: "May"},{id:1,value: "June"},{id:1,value: "July"},{id:1,value: "August"},{id:1,value: "September"},{id:1,value: "October"},{id:1,value: "November"},{id:1,value: "December"}]
  countryList:Array<any>=[{id:1,value: "India",code:'+91'},{id:2,value: "UAE",code:'+881'}];
  constructor(private api:ApiService,private formBuilder:FormBuilder,private router:Router,
    public datepipe: DatePipe) { 
    this.selectedYear = new Date().getFullYear();
  for (let year = this.selectedYear; year <= 2032; year++) {
    this.years.push(year);
  }
  console.log(this.years)
   // this.loginData();
  }

  ngOnInit(): void {
    this.createForm();  
    this.countrycode = this.verifiedUser.country_code;
   console.log(this.countrycode)
}
get form() { return this.profile.controls; }


createForm(){
  this.loginData();
  if(!this.verifiedUser.dob){
    this.showDOB= false;
    
  }else{
    this.showDOB= true;
  }
  console.log(this.verifiedUser.dob);
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
          tnc: [true],
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
if(e.target.value == "UAE"){
  this.isUs = true;
  this.profile.get('passport').setValidators([Validators.required]);
  this.profile.get('passport_expiry_date').setValidators([Validators.required]);
  //this.profile.get('pan').setValidators([Validators.required]);
  //this.profile.pan.clearValidators();
}
else{
  this.isUs = false;
  this.profile.get('passport').clearValidators();
  this.profile.get('passport_expiry_date').clearValidators();
  //this.profile.get('pan').clearValidators();
  
}

}

  update(){
    this.isSubmitted = true;
    console.log(this.profile.value.tnc);
    
    if(this.profile.valid){
      if(this.profile.value.tnc){
        const form_Data = new FormData();
      form_Data.set('country',this.profile.value.country);
      form_Data.set('gender',this.profile.value.gender);
      form_Data.set('expiry_date',this.profile.value.expiry_date);
      form_Data.set('mobile_no',this.profile.value.mobile_no);
      form_Data.set('passport_id',this.profile.value.passport);
      form_Data.set('country_code',this.countrycode);
      form_Data.set('user_id',this.verifiedUser.user_id);
      form_Data.set('dob',this.profile.value.dob=this.datepipe.transform(this.profile.value.dob, 'dd-MM-yyyy')!);
      form_Data.set('Aadhar_Emirates_ID',this.profile.value.pan);
      form_Data.set('passport_expiry_date',this.profile.value.passport_expiry_date);
      form_Data.set('action','profile_update');
      form_Data.set('fullname',this.profile.value.fullname);
      form_Data.set('email',this.profile.value.email);
      this.api.profile(form_Data).subscribe((res:any)=>{
        console.log(res)
        alert(res.ResponseMessage);
        if(res.data){
          localStorage.setItem('verifiedUser',JSON.stringify(res.data));
        }
        
        window.history.back();
      });
      }
      else{
        alert('Please Select Terms and Conditions');       
      
    }
      }
    
    this.profile.value
console.log(this.profile);
    

  }

}
