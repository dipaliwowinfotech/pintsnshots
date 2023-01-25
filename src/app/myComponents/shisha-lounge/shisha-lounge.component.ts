import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-shisha-lounge',
  templateUrl: './shisha-lounge.component.html',
  styleUrls: ['./shisha-lounge.component.css']
})
export class ShishaLoungeComponent implements OnInit {
  shisha:any
  constructor(private api:ApiService,
    private router:Router) { }

  ngOnInit(): void {
    const formData = new FormData();
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
  onhotel(item:any){
    console.log(item);
   
    var hotelId = item.hotel_id;
    this.router.navigate(['product-components'+'/'+hotelId]);
  }

}
