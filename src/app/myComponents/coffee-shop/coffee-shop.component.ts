import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-coffee-shop',
  templateUrl: './coffee-shop.component.html',
  styleUrls: ['./coffee-shop.component.css']
})
export class CoffeeShopComponent implements OnInit {

  constructor(private api:ApiService) { }
   coffee:any;
  ngOnInit(): void {
    const formData = new FormData();
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
     
  }

}
