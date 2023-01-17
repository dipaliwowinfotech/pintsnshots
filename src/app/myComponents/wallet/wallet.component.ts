import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
   activelist:any;
   completedlist:any;
   isActive: any;
   walletdetails:any;
   verifiedUser: any;
  constructor(private api:ApiService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginData();
    this.active();
    
  }

  active(){
    
    const formData = new FormData();
      formData.set('user_id',this.verifiedUser.user_id);
      formData.set('payment_status','active');
      formData.set('action','volet' );
      this.api.walletActive(formData).subscribe((res:any)=>{
        console.log(res);
        this.activelist = res.data;

      })
  }

  completed(){
    const formData = new FormData();
      formData.set('user_id',this.verifiedUser.user_id);
      formData.set('payment_status','active');
      formData.set('action','volet' );
      this.api.walletCompleted(formData).subscribe((res:any)=>{
        console.log(res);
        this.completedlist = res.data;

      })
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }


  onwallet(item:any){
    const formData = new FormData();
    formData.set('user_id',this.verifiedUser.user_id);
    formData.set('hotel_id',item.hotel_id);

    formData.set('payment_status','Incomplete');
    formData.set('action','volet_details' );
    formData.set('order_id',item.order_id);
    this.api.walletDetails(formData).subscribe((res:any)=>{
      console.log(res);
      this.walletdetails = res;
      
      
    })
  }
}