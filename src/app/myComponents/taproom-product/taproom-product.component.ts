import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-taproom-product',
  templateUrl: './taproom-product.component.html',
  styleUrls: ['./taproom-product.component.css']
})
export class TaproomProductComponent implements OnInit {
  tap:any
  constructor(private api:ApiService,
    private router:Router) { }

  ngOnInit(): void {
    const formData = new FormData();
    formData.set('category_id', '1');
    formData.set('mac_address', '02:00:00:00:00:00');
    formData.set('latitude', '19.9723313');
    formData.set('action', 'hotel');
    formData.set('offset_value', '0');
    formData.set('longitude', '73.7817225');
     this.api.taproom(formData).subscribe((res:any)=>{
         console.log(res)
         this.tap = res.data;
     })
  }
  onhotel(item:any){
    console.log(item);
   
    var hotelId = item.hotel_id;
    this.router.navigate(['product-components'+'/'+hotelId]);
  }

}
