import { DomElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  verifiedUser:any;
  cartlist:any;
   cartform!: FormGroup;
   quantity:number=1;
   Total: any;
   totalPrice:any;
   billtotal:any=[];
   totalbill:number=0;
   totalcoupons:any;
   showLoader: boolean = false;

   productIdlist:any=[];
   discountlist:any=[];
   productpricelist:any=[];
   
   quantitylist:any=[];
   totalquantity:any;
   unitidlist:any=[];
   userid:any;
   hotel_id:any;
   cartlistlength:any;
   cartempty:boolean=false;
  discountPrice: any;
  productprice: any;
  productdiscount: any;

  totalDiscount:any;
  discCalPrize:number=0;
  totalDiscPrize:any=[];
  discountprice:number=0;
  d1:any;

  constructor(private api:ApiService,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {

    this.loginData();
    this.showLoader = true;
    this.cartList();
    
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }
  

  cartList(){
    const formData = new FormData();
    formData.set('user_id', this.verifiedUser.user_id);
   
    formData.set('action', 'view_cart');
    this.api.CartList(formData).subscribe((res:any)=>{
      if(res!=null){
      console.log(res);
      this.cartlist = res.data;
      this.cartlist.forEach((element:any) => {
        this.productIdlist.push(element.product_id);
        this.discountlist.push(element.discount);
        this.productpricelist.push(element.price);
        this.quantitylist.push(element.quantity);
        this.unitidlist.push(element.unit);
        this.hotel_id=element.hotel_id;
        console.log(this.productIdlist);
       
      });
      
         
      console.log(this.cartlist);
      this.billtotal = [];
      this.totalDiscPrize = [];
      this.cartlist.forEach((element: any) => {
        this.totalPrice = element.price*element.quantity;
        this.totalDiscount = this.totalPrice -(this.totalPrice*element.discount/100)
        this.totalDiscPrize.push(this.totalDiscount);
        console.log(this.totalDiscPrize);
        this.billtotal.push(this.totalPrice);
        
        
      
     });

     this.showLoader = false;
    console.log(this.productIdlist.toString());
    //  this.cartlist.forEach((x:any) => {
    //     this.totalcoupons=
    //  });
    this.totalcoupons=this.cartlist.filter((item:any) => item.discount === item.discount).length
    console.log(this.totalcoupons)
   this.totalbill = this.billtotal.reduce((acc:any, cur:any) => acc + cur, 0);
   this.discCalPrize = this.totalDiscPrize.reduce((acc:any, cur:any) => acc + cur, 0);
   console.log(this.discCalPrize);
    this.totalquantity=this.cartlist.filter((item:any) => item.product_id === item.product_id).length
    this.discountprice = this.totalbill-this.discCalPrize;
   
    
    this.d1 = this.discountprice.toFixed(1);
    console.log(this.discountprice);
       
      }else{
       this.cartempty=true;
       this.showLoader = false;
      }
    })

   

  }

  quantityChange(event:any,price:any,quantity:any,i:any){
    console.log(quantity)
    // this.Total = quantity* price;

    console.log('event',this.Total);
  }
  quantityUp(product_id:any,quantity:any,cart_id:any){
    quantity++;
    console.log(quantity)
    const formData = new FormData();
    formData.set('cart_id',cart_id);
    formData.set('quantity',quantity);
    formData.set('action', 'update_cart');
   this.api.editCart(formData).subscribe((res)=>{
     console.log(res)
   })
this.cartList();
   console.log(this.totalbill)
  }

  quantitydown(product_id:any,quantity:any,cart_id:any){
   
    if(quantity>=2){
      quantity--;
      console.log(quantity)
      const formData = new FormData();
      formData.set('cart_id',cart_id);
      formData.set('quantity',quantity);
      formData.set('action', 'update_cart');
     this.api.editCart(formData).subscribe((res)=>{
       console.log(res)
     })
  this.cartList();
    }
   
   
  }
  getTotal(price:any,quantity:any,discount:any){
    this.Total = price*quantity;
   console.log(this.Total)
  }
  
  

  DeleteCart(cart_id:any,index:any){
    const formData = new FormData();
    formData.set('cart_id',cart_id );
    formData.set('action','delete_cart');
    this.api.deleteCart(formData).subscribe((res:any)=>{
     
      console.log(res);

      alert("Product Deleted Succsessfully!")
      //this.router.navigate(['/add-cart']);
    })
    
    this.cartlist.splice(index,1);
    this.cartList();

    this.api.addCart(this.cartlist)
    const form_Data = new FormData();
    form_Data.set('user_id',this.verifiedUser.user_id );
    form_Data.set('action','cart_count');
    this.api.cartCount(form_Data).subscribe((response:any)=>{
      this.cartlistlength= response.data.count;

      console.log(this.cartlistlength);
    })
      var data=this.api.getCart();
      this.api.onMainEvent.emit(data);
      this.cartList();
  }

  
}     
        
        
        
        
        

    

    

  
 


