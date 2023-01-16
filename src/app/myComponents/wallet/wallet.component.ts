import { Component, OnInit } from '@angular/core';
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
  constructor(private api:ApiService) { }

  ngOnInit(): void {}

  active(){
    const formData = new FormData();
      formData.set('user_id','163');
      formData.set('payment_status','active');
      formData.set('action','volet' );
      this.api.walletActive(formData).subscribe((res:any)=>{
        console.log(res);
        this.activelist = res.data;

      })
  }

  completed(){
    const formData = new FormData();
      formData.set('user_id','163');
      formData.set('payment_status','active');
      formData.set('action','volet' );
      this.api.walletCompleted(formData).subscribe((res:any)=>{
        console.log(res);
        this.completedlist = res.data;

      })
  }
}