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

  login:any;
 
  
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

      this.api.logOut.subscribe((loginDATA)=>{
        console.log(loginDATA);
        this.username1 = loginDATA.fullname;
      })
    }

  ngOnInit(): void {
    
    this.login = this.api.getlogin();
    console.log(this.login)
   
    this.loginData();
    
    
    this.api.addCart(this.cartlist)
    var data1=this.api.getCart();
    this.api.onMainEvent.emit(data1);

     
    //  this.cartList();
  }
  ngOnChanges() {
   
     }

  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    this.username1 = this.verifiedUser.fullname;
   
  }

  ngAfterViewInit(): void{
    this.login = this.api.getlogin();
    console.log(this.login)
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
    window.location.reload();
    alert("Logout Succssesfully!")
    // this.router.navigate(['login '])
    
  }

}

    
    