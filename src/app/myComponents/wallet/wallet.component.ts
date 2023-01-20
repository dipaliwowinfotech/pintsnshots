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
   complete:any = "Compl";
   actiVe:any = "Active";
   showError: boolean = false;
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
        if(res){
          this.activelist = res.data;
        }
        if(!res.data.length){
          this.showError = true;

        }
        

      })
  }

  completed(){
    const formData = new FormData();
      formData.set('user_id',this.verifiedUser.user_id);
      formData.set('payment_status','complete');
      formData.set('action','volet' );
      this.api.walletCompleted(formData).subscribe((res:any)=>{
        console.log(res);
        if(res){
          this.completedlist = res.data;
        }
        if(!res.data.length){
          this.showError = true;
        }
        

      })
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }


  onwallet(item:any,status:any){
    console.log(status);
    var id = item.order_id;
    var hotelId = item.hotel_id;
    this.router.navigate(['wallet-details'+'/'+id+'/'+hotelId+'/'+status]);
  }
}