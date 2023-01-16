import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cartItems:any;
  onMainEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http:HttpClient,
    private router:Router) { }

  getOtp(payload: any) {
    return this.http.post(
      'https://wowinfotech.net/pinsnshots/api/Admin/otp',
      payload
    );
  }
  sentOtp(formData:any){
   
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/mobile_user.php/",formData)
  }
  register(formData:any){
   
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/mobile_user.php/",formData)
  }
  banner(formData:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/hotel_gallery.php/",formData)
  }
taproom(formdata:any){
  return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/hotel.php/",formdata)
}
coffeeShop(formData:any){
  return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/hotel.php/",formData)
}
shisha(formData:any){
  return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/hotel.php/",formData)
}
list:any;
   getOTP(){
      return this.list;
   }
   setOTP(data:any[]){
       this.list = data;
   }

   productCategory(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/product.php/",formdata)
   }

   sub_category(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/sub_category.php/",formdata)
   }
   
   product:any;
   getProduct(){
    return this.product;
   }
   setProduct(data:any){
    this.product = data;
   }
   profile(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/update_profile.php/",formdata)
   }
   addtocart(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }
   clearCart(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }

   CartList(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }
   editCart(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }
   deleteCart(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }
   checkout(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/check_db.php/",formdata)
   }
   cartCount(formdata:any){
    return this.http.post("https://wowinfotech.net/pinsnshots/pintsnshots_api/cart.php/",formdata)
   }
   remove(){
    localStorage.removeItem("verifiedUser");
    this.router.navigate([''])
   }



   loginData:any;
   getlogin(){
    return this.loginData;
   }

   setlogin(data:any){
     this.loginData = data;
   }


   addCart(data:any){
    this.cartItems=data;
    }

   removeCart(data:any){
    this.cartItems.splice(data,1);
   }
   getCart(){
     return this.cartItems;
   }

  
  
  
  
}
