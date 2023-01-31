import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'src/assets/smtp.js';
declare let Email: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm!: FormGroup;
  isSubmitted: boolean = false;
  //Email: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      mobile_no: ['', [Validators.required,
      Validators.pattern('[6-9]\\d{9}'),
      Validators.minLength(10),
      Validators.maxLength(10)],

      ],

      fullname: ['', [Validators.required,
      ]],
      email: ['', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
      ]],
      subject: ['', [Validators.required,
      ]],
      msgTxt: ['', [Validators.required,
      ]],

    });
  }

  submit(){
   this.isSubmitted = true;
    console.log('ContactUs',this.contactForm);
    if(this.contactForm.valid){
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'wowinfo.angular@gmail.com',
      Password : '52FB42033E3AC25ACD7D4707F3AA27FA1E7A',
      To : 'wowinfo.angular@gmail.com',
      From : this.contactForm.value.email,
      //ReplyFrom : this.contactForm.value.email ,
      Subject : this.contactForm.value.subject,
      Body : this.contactForm.value.msgTxt
      }).then( (message:any) => {alert(message); } );
  }
  }
  get form() { return this.contactForm.controls; }

}
