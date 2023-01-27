import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hotel-detalis',
  templateUrl: './hotel-detalis.component.html',
  styleUrls: ['./hotel-detalis.component.css']
})
export class HotelDetalisComponent implements OnInit {
  review!: FormGroup;
  verifiedUser: any;
  hotelID:any;
  bannarlist:any =[];
  hotelList: any= [];
  hotelList1: any= [];
  isSubmitted: boolean = false;
  showPopup: boolean = false;
  banrImg:any = "assets/img/new_logo.png";
  lat: any;
  reviewlst: any;
  rate:any=0;
  //reviewmsg:any;
  imgUrl:any = "https://wowinfotech.net/pinsnshots/pintsnshots_api/" ;
  constructor(private api:ApiService,
    private route: ActivatedRoute,
    private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginData();
    
    this.hotelID = this.route.snapshot.params['hotelId'];
    
    const formData = new FormData();
    formData.set('hotel_id',this.hotelID);
    formData.set('action','hotel_gallery');
    this.api.hotelBanner(formData).subscribe((res:any)=>{
     console.log(res);
     console.log(this.hotelID);
     if(res){
      this.bannarlist=res.data;
     }
     

    });  
    console.log( this.bannarlist);
 
      this.hotelList1=JSON.parse(localStorage.getItem('selectedHotel')!);
      
      this.hotelList.push(this.hotelList1);
      this.bannarlist = this.hotelList;
   console.log(this.hotelList);
  this.createForm();
  this.getReview();

  

  
  }

  createForm() {
    this.review = this.fb.group({
      
      reviewmsg: ['', [Validators.required,
      ]],     

    });
  }
  get form() { return this.review.controls; }

  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }

  getReview(){
    const formData = new FormData();
    formData.set('hotel_id',this.hotelID);
    formData.set('action','get_review');
    this.api.review(formData).subscribe((res:any)=>{
      this.reviewlst = res.data;
     console.log(res);
    }); 
  }

  updateReview(){
    this.isSubmitted = true;
    
    if(this.review.valid){
      const formData = new FormData();
      formData.set('user_id',this.verifiedUser.user_id);
    formData.set('review',this.review.value.reviewmsg);
    formData.set('rating',this.rate);
    formData.set('hotel_id',this.hotelID);
    formData.set('action','review');
    this.api.updateReview(formData).subscribe((res:any)=>{
      this.isSubmitted = false;
     console.log(res);
    });
      document.getElementById("closemodal")?.click();
      console.log(this.rate,this.review.value.reviewmsg)
    }
    
  }
  
}
