import { Component, OnInit, ɵisListLikeIterable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.css']
})
export class ProductDetalisComponent implements OnInit {
detaillist:any=[];
productname:any
productList:any;
relatedlist:any;
productimage:any;
productdetail:any;
productprice:any;
productsize:any;
productunit:any;
productdiscount:any;
add:any;
verifiedUser:any;
isVerified: boolean= false;
quantity:any;
qty!:FormGroup
productid:any;
hotel_id:any;
unit:any;
openmodal:boolean=false;
  productpriceid: any;
  displayStyle:any;
  cartlist: any;
  selectedProduct:any;
  discountPrice: any;
  
  constructor(private api:ApiService,private formBuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.selectedProduct =JSON.parse(localStorage.getItem('selectedProduct')!);
    console.log(this.selectedProduct);
    this.qty = this.formBuilder.group({
     quantity:[1]
     

    });
    
    
   this. detaillist = this.selectedProduct;
   console.log(this.detaillist,'passed data'); 
   this.productname = this.detaillist.product_name;
   this.productimage = this.detaillist.product_image;
   this.productdetail = this.detaillist.product_details;
   this.productprice = this.detaillist.price;
   this.productsize = this.detaillist.size;
   this.productunit= this.detaillist.unit;
   this.productdiscount= this.detaillist.discount;
   this.hotel_id= this.detaillist.hotel_id;
   this.productid= this.detaillist.product_id;
   this.productpriceid= this.detaillist.product_price_id;
   this.discountPrice = this.productprice -(this.productprice * this.productdiscount/100);
   console.log(this.discountPrice);
   this.products();
   this.loginData();
   console.log(this.verifiedUser,'verified')
   this.quantity =1;
   
   this.cartList();
  }
  
 
  products(){
    const form_data = new FormData();
    form_data.set('offset', '0');
    form_data.set('hotel_id', '2');
    form_data.set('limit', '5');
   
    form_data.set('subcat_ids', this.detaillist.sub_category_id);
    
     this.api.sub_category(form_data).subscribe((res:any)=>{
         console.log(res)
         this.productList = res.data;
         console.log(this.productList,'related product')
         
  
     })
  }
  cartList(){
    const formData = new FormData();
    formData.set('user_id', this.verifiedUser.user_id);
   
    formData.set('action', 'view_cart');
    this.api.CartList(formData).subscribe((res:any)=>{
      console.log(res);
      this.cartlist = res.data;
     
      });  
         
     
   
    
  }

  addtocart(){
    
    if(JSON.parse(localStorage.getItem('verifiedUser')!)){

    
    const form_data = new FormData();
    form_data.set('unit', this.productunit);
    form_data.set('quantity', this.quantity);
    form_data.set('user_id', this.verifiedUser.user_id);
    form_data.set('price', this.productprice);
    form_data.set('product_id',this.productid);
    form_data.set('hotel_id', this.hotel_id);
    form_data.set('product_price_id', this.productpriceid);
    form_data.set('action', 'add_cart');
    this.api.addtocart(form_data).subscribe((res)=>{
      console.log(res)
      this.add = res; 
     if(this.add.ResponseCode==2){
     this.openmodal = true;
     this.displayStyle = "block";
     }
     if(this.add.ResponseCode==1){
        alert(this.add.ResponseMessage)
     }else{
      this.api.addCart(this.cartlist)
      var data=this.api.getCart();
      this.api.onMainEvent.emit(data);
      alert(this.add.ResponseMessage);
      this.router.navigate(['product-components'])
      
     }
    
    })
  //   if(this.add.ResponseCode==0){
  //     alert(this.add.ResponseMessage)
  //  }
    
  }
  if(!this.verifiedUser){
  alert("Please Login First");
  
  }
  }

  quantityUp(){
    this.quantity++;
    
  }

  quantitydown(){
   
    if(this.quantity>=2){
      this.quantity--;
    }
     
   
  }
  
closePopup() {
    this.displayStyle = "none";
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }
emptyCart(){
  const removecart = new FormData();
  removecart.set('user_id',this.verifiedUser.user_id);
  removecart.set('action', 'delete_user_cart');
  this.api.clearCart(removecart).subscribe((res)=>{
   console.log(res)
  
   this.displayStyle = "none";
  })


}

  }
