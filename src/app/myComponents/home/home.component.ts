import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
bannerList:any;
taplist:any;
  coffee: any;
  shisha: any;
  cartlist:any;
  showLoader: boolean = false;

constructor(private api:ApiService) { }



  ngOnInit(): void {
   
   this.showLoader = true;
   setTimeout(()=>{
    this.showLoader = false;
   },3000)
    const formData = new FormData();
    formData.set('action','hotel_banner');

    this.api.banner(formData).subscribe((res:any)=>{
      console.log(res)
      this.bannerList = res.data;
    });

    const formdata = new FormData();
    formData.set('category_id', '1');
    formData.set('mac_address', '02:00:00:00:00:00');
    formData.set('latitude', '19.9723313');
    formData.set('action', 'hotel');
    formData.set('offset_value', '0');
    formData.set('longitude', '73.7817225');
     this.api.taproom(formData).subscribe((res:any)=>{
         console.log(res)
         this.taplist = res.data;
     });

     const Data = new FormData();
     formData.set('category_id', '2');
     formData.set('mac_address', '02:00:00:00:00:00');
     formData.set('latitude', '19.9723313');
     formData.set('action', 'hotel');
     formData.set('offset_value', '0');
     formData.set('longitude', '73.7817225');
      this.api.taproom(formData).subscribe((res:any)=>{
          console.log(res)
          this.coffee = res.data;
      })

      const data = new FormData();
    formData.set('category_id', '3');
    formData.set('mac_address', '02:00:00:00:00:00');
    formData.set('latitude', '19.9723313');
    formData.set('action', 'hotel');
    formData.set('offset_value', '0');
    formData.set('longitude', '73.7817225');
     this.api.shisha(formData).subscribe((res:any)=>{
         console.log(res)
         this.shisha = res.data;
     })


     
    
    
 
  }




 



}
