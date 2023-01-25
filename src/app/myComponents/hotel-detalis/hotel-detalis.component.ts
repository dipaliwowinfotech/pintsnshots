import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hotel-detalis',
  templateUrl: './hotel-detalis.component.html',
  styleUrls: ['./hotel-detalis.component.css']
})
export class HotelDetalisComponent implements OnInit {
  verifiedUser: any;
  hotelID:any;
  bannarlist:any;
  constructor(private api:ApiService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.loginData();
    
    this.hotelID = this.route.snapshot.params['hotelId'];

    const formData = new FormData();
    formData.set('hotel_id',this.hotelID);
    formData.set('action','hotel_gallery');
    this.api.hotelBanner(formData).subscribe((res:any)=>{
     console.log(res);
     console.log(this.hotelID);
     this.bannarlist=res;

    })  


    if(!this.bannarlist){
    const formData1 = new FormData();
    formData1.set('category_id',this.hotelID);
    formData1.set('user_id','7');
    formData1.set('mac_address','1');
    formData1.set('action','hotel');
    formData1.set('offset_value','0');
    formData1.set('latitude','');
    formData1.set('longitude','');
    this.api.hotellist(formData).subscribe((res)=>{
      console.log(res);
      this.bannarlist = res;
    })
    }


  

  
  }

  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }
  
}
