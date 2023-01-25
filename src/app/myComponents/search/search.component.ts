import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTxt: any;
  HotelList: any;
  ProductList:any;
   Ontab: boolean = true;
   

  imgUrl:any = "https://wowinfotech.net/pinsnshots/pintsnshots_api/" ;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.hotelList();
    this.searchProduct();
  }


  search(Text:any){
    if(this.Ontab){
      console.log(this.Ontab);
    const formData = new FormData();
      formData.set('offset','0');
      formData.set('user_id','7');
      formData.set('latitude','20.0086779' );
      formData.set('limit','10');
      formData.set('type','hotel' );
      formData.set('word',Text);
      formData.set('longitude','73.763892');
     
    this.apiService.search(formData).subscribe((res:any)=>{
      //console.log(res);
      this.HotelList = res.data;
    });
  }else{
    const formData = new FormData();
      formData.set('offset','0');
      formData.set('user_id','7');
      formData.set('latitude','20.0086779' );
      formData.set('limit','10');
      formData.set('type','product' );
      formData.set('word',Text);
      formData.set('longitude','73.763892');
     
    this.apiService.search(formData).subscribe((res:any)=>{
      this.ProductList = res.data;
      console.log(this.ProductList);
    });
  }

  }

  hotelList(){
    const formData = new FormData();
      formData.set('offset','0');
      formData.set('user_id','7');
      formData.set('latitude','20.0086779' );
      formData.set('limit','10');
      formData.set('type','hotel' );
      formData.set('word','');
      formData.set('longitude','73.763892');
     
    this.apiService.search(formData).subscribe((res:any)=>{
      this.HotelList = res.data;
console.log(this.HotelList);
    });
  }

  searchProduct(){
     console.log(this.Ontab);
    const formData = new FormData();
      formData.set('offset','0');
      formData.set('user_id','7');
      formData.set('latitude','20.0086779' );
      formData.set('limit','10');
      formData.set('type','product');
      formData.set('word','');
      formData.set('longitude','73.763892');
     
    this.apiService.search(formData).subscribe((res:any)=>{
      this.ProductList = res.data;
      console.log(this.ProductList);
      
    });
  }
  taproom(){
   this.Ontab = true;

  }
  product(){
   this.Ontab= false;
  }
}
