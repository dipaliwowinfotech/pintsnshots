import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup 
  otpForm!: FormGroup 
  otpData:any;
  isSubmitted: boolean = false;
  
  constructor(private api:ApiService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobile_no:['',[Validators.required,
       Validators.pattern('[6-9]\\d{9}'),
        Validators.minLength(10),
        Validators.maxLength(10)],
        
      ],

     fullname: ['', [Validators.required,
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z].*')]],

    });
    
    
  }
  get form() { return this.loginForm.controls; }
  
  login(){
    this.isSubmitted= true;
    let payload = {
      "mobile_no":""
    }
  this.loginForm.value
  console.log(this.loginForm)
  if(this.loginForm.valid){
  this.api.setlogin(this.loginForm.value);
  this.api.getOtp(this.loginForm.value).subscribe((res:any)=>{
    console.log(res)
    this.otpData = res.DATA;
   
    this.api.setOTP(this.otpData);

    
    this.router.navigate(['/otp'])
    })
  }

}
// OnSubmit(){
//   if(this.loginForm.valid){
//   //sent object to database
// }else{
//   // console.log('Form is not valid')
//   //throw the error using toaster and with required files
//    this.validateAllFormFields(this.loginForm);
//    alert("Form is invalid");
// }
// }


// private validateAllFormFields(formgroup:FormGroup){
//   Object.keys(formgroup.controls).forEach(Field=>{
//     const control = formgroup.get(Field);
//       if(control instanceof FormControl){
//         control.markAsDirty({onlySelf:true})
//       }else if(control instanceof FormGroup){
//          this.validateAllFormFields(control)
//       }

//   })
// }

}