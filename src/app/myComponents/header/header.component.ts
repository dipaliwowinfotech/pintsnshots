import { Component, OnInit,OnChanges, SimpleChanges,AfterViewInit } from '@angular/core';
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
  userId1: any;
  isShow: boolean = true;
  displayStyle:any;
  login:any;
 
  
  constructor(private api:ApiService,
    private formBuilder:FormBuilder,
    private router:Router) { 
      
      
      this.api.onMainEvent.subscribe((res)=>{
        if(this.verifiedUser){
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
        }
        
        // this.cartlength=this.cartlist.length;
      })

      this.api.logOut.subscribe((loginDATA)=>{
        console.log(loginDATA);
        this.username1 = loginDATA.fullname;
        this.userId1 = loginDATA.user_id;
      })
    }

  ngOnInit(): void {
    this.loginData();   
    
    this.login = this.api.getlogin();
    console.log(this.login)
    

     
    //  this.cartList();
  }
  
  ngOnChanges() {
   
     }

  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    if(this.verifiedUser){
      this.username1 = this.verifiedUser.fullname;     
        
          const formData = new FormData();
        formData.set('user_id', this.verifiedUser.user_id);
       
        formData.set('action', 'cart_count');
        this.api.cartCount(formData).subscribe((response:any)=>{
          console.log(response);
         this.cartlength=response.data.count;
          console.log(this.cartlength);
        })

      
    }
    
   
  }

  ngAfterViewInit(): void{
    this.loginData();
    setTimeout(()=>{
      this.api.addCart(this.cartlist)
      var data1=this.api.getCart();
      this.api.onMainEvent.emit(data1);
     },300)
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
    this.displayStyle = "block";
  }

  onSelect(){
    
      this.isShow = false;
     
    //document.getElementById("sub_1")!.style.display = "none";
   
    setTimeout(()=>{
      this.isShow = true;
     },3)
  }
  closePopup() {
    this.displayStyle = "none";
  }
  closeapp(){
    this.api.remove();
   
    // alert("Logout Succssesfully!");
    
    if(this.router.url=='/'){
      window.location.reload();
    }
    else{
      
      
      setTimeout(()=>{
        window.location.reload();
       },300)
       this.router.navigate(['']);
    }
    
    
}

    
}   