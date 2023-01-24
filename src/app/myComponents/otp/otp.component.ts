import { Component, OnInit, ViewChild } from '@angular/core';
import {NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpform!:any
  otp: any;
  logindata:any;
  showOtpComponent = true;
  verifiedlogin:any;
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  config :NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: ''
  };
  
  loginform: any;
  otpData:any;
  payload:any;
  wrongOTP:boolean = false
  formdata:any
  login: any;
  mobileNo:any;
  timeLeft: number = 60;
  interval:any;
  show= false;
  
  constructor(private api:ApiService,private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  this. payload = this.api.getOTP();
  this.mobileNo = this.api.getlogin();
  this.startTimer();
    console.log(this.mobileNo)
  
  }

    
  onOtpChange(otp:any) {
  
    this.otp = otp;
    //this.otpform.value
}

verify(){
  if(this.otp == this.payload){
 this.logindata  =this.api.getlogin();
    console.log('logindata',this.logindata)
    const formData = new FormData();
    formData.set('dob','');
    formData.set('mobile_no',this.logindata.mobile_no);
    formData.set('action','register');
    formData.set('fullname',this.logindata.fullname);
    formData.set('email',this.logindata.mobile_no);
    this.api.register(formData).subscribe((data:any)=>{
       console.log(data);
       this.verifiedlogin = data.data;
       console.log(this.verifiedlogin);
       localStorage.setItem('verifiedUser',JSON.stringify(this.verifiedlogin));
      })
    this.api.setlogin(this.logindata);
    alert('Login Succsessfully!')
    setTimeout(()=>{
      window.location.reload();
     },30)
     this.router.navigate(['']);
      this.login = this.api.getlogin();
    console.log(this.login)
    this.api.logOut.emit(this.login)
    }
    this.wrongOTP = true;

  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
resend(){
  let payload = {
    "mobile_no":""
  }
  this.api.getOtp(payload).subscribe((res:any)=>{
   console.log(res)
  })
}
  

  
  
  
 
  


}
