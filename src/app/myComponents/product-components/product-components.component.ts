import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-components',
  templateUrl: './product-components.component.html',
  styleUrls: ['./product-components.component.css']
})
export class ProductComponentsComponent implements OnInit {
product:any;
productList:any;
productId:any;
list:any=[];
selectedCat:any;
isActive: any;
hotelID:any;
long:any;
lat: any;

  constructor(
    private router: Router,
    private api:ApiService,
    private route: ActivatedRoute
   ) { }

  ngOnInit(): void {
    this.hotelID = this.route.snapshot.params['hotelId'];
    this.long = this.route.snapshot.params['long'];
    this.lat = this.route.snapshot.params['lat'];
    console.log(this.long,this.lat);
    const formData = new FormData();
    formData.set('hotel_id',this.hotelID);
   
    formData.set('action', 'product_category');
    
     this.api.productCategory(formData).subscribe((res:any)=>{
         console.log(res)
         this.product = res.data;
         this.selectedCat = this.product[0].product_category_id;
         console.log(this.selectedCat );
         this.shots(this.selectedCat);
     })
     //this.selectedCat = this.product.find((item:any) => item.product_category_id === 3);
     console.log(this.selectedCat );   
        
  }
  
   
  shots(id:any){
    this.isActive = id;
    const form_data = new FormData();
    form_data.set('offset', '0');
    form_data.set('hotel_id', this.hotelID);
    form_data.set('limit', '5');
   
    form_data.set('subcat_ids', id);
    
     this.api.sub_category(form_data).subscribe((res:any)=>{
         console.log(res)
         this.productList = res.data;
     })
    console.log(id)
  }
  details(item:any){
    localStorage.setItem('selectedProduct', JSON.stringify(item));
   this.list=item;
    this.productId = item.product_id;
    console.log(this.productId);
    this.api.setProduct(this.list);
      this.router.navigate(['/product-detalis'])
  }
  onhotel(){
    console.log();   
    
    this.router.navigate(['hotel-details'+'/'+this.hotelID]);
  }


}
