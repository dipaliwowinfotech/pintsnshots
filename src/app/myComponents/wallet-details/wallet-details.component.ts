import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {
  verifiedUser: any;
  walletdetails: any;
  hotelID:any;
  orderID:any;
  mobile:any;
  mobileForm!: FormGroup;
  shareUser:any;
  shareUserName:any;
  itemData: any = 'none';
  price:any;
  quantityForm!: FormGroup;
  show: boolean = false;
  status:any;
  showShare: boolean = true;
  
  constructor(private api:ApiService,
    private route: ActivatedRoute,private formBuilder: FormBuilder) { }

 

  ngOnInit(): void {

    this.loginData();
    this.createForm();
    this.orderID = this.route.snapshot.params['id'];
    this.hotelID = this.route.snapshot.params['hotelId'];
    this.status = this.route.snapshot.params['status'];
    if(this.status=="Active"){
      this.walletDetails();
    }
    if(this.status=="Compl"){
      this.walletCompletedDetails();
      this.showShare = false;
    }
    
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }

  createForm(){

    this.mobileForm = this.formBuilder.group({
      mobile:['',[Validators.required,
       Validators.pattern('[6-9]\\d{9}'),
        Validators.minLength(10),
        Validators.maxLength(10)],
        
      ],


    });

    this.quantityForm = this.formBuilder.group({
      quantity:['']
    })
  }

  walletCompletedDetails(){
    const formData = new FormData();
    formData.set('user_id',this.verifiedUser.user_id);
    formData.set('hotel_id',this.hotelID);

    formData.set('payment_status','complete');
    formData.set('action','volet_details' );
    formData.set('order_id',this.orderID);
    this.api.walletDetails(formData).subscribe((res:any)=>{
      console.log(res);
      this.walletdetails = res.data;
      
      
    })
  }

  walletDetails(){
    const formData = new FormData();
    formData.set('user_id',this.verifiedUser.user_id);
    formData.set('hotel_id',this.hotelID);

    formData.set('payment_status','Incomplete');
    formData.set('action','volet_details' );
    formData.set('order_id',this.orderID);
    this.api.walletDetails(formData).subscribe((res:any)=>{
      console.log(res);
      this.walletdetails = res.data;
      
      
    })
  }
  get form() { return this.mobileForm.controls; }

  checkMobile(){
console.log(this.mobileForm.value);
    const formData = new FormData();
    formData.set('email',this.mobileForm.value.mobile);
    formData.set('action','share_step1');
    this.api.walletMobileCheck(formData).subscribe((res:any)=>{
      console.log(res);
      if(res.ResponseCode ==1){
alert(res.ResponseMessage);
      }
      this.shareUser = res.data;
      this.shareUserName = this.shareUser.fullname;
    })
  }

  getPrice(item:any){
    
    this.price = item.product_price -(item.product_price * item.discount_id/100)
console.log(this.price );
  }

  openMobileModal(item:any){
    this.itemData = item;
    console.log(item)
 }
 
 shareWallet(){
  if(this.quantityForm.value.quantity<=this.itemData.quantity)  {
    const formData = new FormData();
    formData.set('share_id',this.verifiedUser.user_id);
    formData.set('order_details_id',this.itemData.order_details_id);
    formData.set('user_id',this.verifiedUser.user_id);
    formData.set('total_amount',this.itemData.product_price);
    formData.set('product_id',this.itemData.product_id);
    formData.set('total_quantity',this.itemData.quantity);
    formData.set('product_price',this.itemData.product_price);
  
    formData.set('unit_id',this.itemData.unit_id);
    formData.set('discount_id',this.itemData.discount_id);
  
    formData.set('action','share_step2' );
    formData.set('order_id',this.orderID);
    this.api.walletShare(formData).subscribe((res:any)=>{
      console.log(res); 
      if(res.ResponseCode){
        alert(res.ResponseMessage);
        this.show = true;
        document.getElementById("closemodal")?.click();
      }
      
    })
  }else{
  alert('Total Quantity Available:'+this.itemData.quantity);
  }
 }

}
