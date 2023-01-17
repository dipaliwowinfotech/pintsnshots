import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  verifiedUser: any;
  cartlist: any;
  cartcount:any;
  cartlength:any;
  username1:any;
 
  
  constructor(private api:ApiService,
    private formBuilder:FormBuilder,
    private router:Router) { 
      this.api.onMainEvent.subscribe((res)=>{
        const formData = new FormData();
        formData.set('user_id', this.verifiedUser.user_id);
       
        formData.set('action', 'cart_count');
        this.api.cartCount(formData).subscribe((response:any)=>{
          console.log(response);
         this.cartlength=response.data.count;
          console.log(this.cartlength);
        })
console.log(res)
        this.cartlist=res;
        // this.cartlength=this.cartlist.length;
      })
    }

  ngOnInit(): void {
    this.loginData();
    this.username1 = this.verifiedUser.fullname;
    console.log(this.username1)
    this.api.addCart(this.cartlist)
    var data1=this.api.getCart();
    this.api.onMainEvent.emit(data1);

     
    //  this.cartList();
  }
  ngOnChanges(changes: SimpleChanges) {
   
     }

  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
   
  }

  cartList(){
    const formData = new FormData();
    formData.set('user_id', this.verifiedUser.user_id);
   
    formData.set('action', 'view_cart');
    this.api.CartList(formData).subscribe((res:any)=>{
      console.log(res);
      this.cartlist = res.data;
      console.log(this.cartlist);
     
      
     
   
    
    })
    
  }
  logout(){
    this.api.remove();
   
    this.router.navigate([' '])
  }

}
