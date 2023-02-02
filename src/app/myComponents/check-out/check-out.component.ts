import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { PayWindowService } from 'src/app/pay-window.service';
import { PaymentSuccessModalComponent } from './payment-success-modal/payment-success-modal.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  verifiedUser: any;
  cartlist:any;
  cartform!: FormGroup;
  quantity:number=1;
  Total: any;
  totalPrice:any;
  billtotal:any=[];
  totalbill:any;
  totalcoupons:any;
   tapRoom:any;
   tapRoomAddress:any;
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
  rzp1:any;
  payMentID:any;
  paymentSuccess: boolean = false;
  options:any;

  totalList:any=[];
  TotalCal:any;
  TotalPrice:any;

  saved:any;
  savedAmount:any = [];
  savedamnt:any;
  constructor(private api:ApiService,private router:Router,private winRef: PayWindowService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loginData();
    this.cartList();
    this.getBill();
  }
  loginData(){
    this.verifiedUser = JSON.parse(localStorage.getItem('verifiedUser')!);
    
  }

  getTotal(i:any){
    this.Total = i.price*i.quantity;
    
    this.Total = this.Total - (this.Total * i.discount / 100);
    // this.billtotal.push( this.Total);
    // this.getBill();
  }

  getBill(){
    
    // this.totalbill = this.billtotal.reduce((acc:any, cur:any) => acc + cur, 0);
     
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
        this.tapRoom=element.hotel_name =element.hotel_name;
        this.tapRoomAddress=element.address =element.address;
        this.productIdlist.push(element.product_id);
        this.discountlist.push(element.discount);
        this.productpricelist.push(element.price);
        this.quantitylist.push(element.quantity);
        this.unitidlist.push(element.unit);
        this.hotel_id=element.hotel_id;
        console.log(this.productIdlist);
        
      });
     
     
      this.cartlist.forEach((element: any) => {
        this.totalbill = element.price*element.quantity;
        this.TotalCal = this.totalbill -(this.totalbill * element.discount/100);
        this.saved = this.totalbill - this.TotalCal;
        this.billtotal.push(this.TotalCal);
        this.savedAmount.push(this.saved);
        
      console.log(this.TotalCal);
     });
     
     this.TotalPrice = this.billtotal.reduce((acc:any, cur:any) => acc + cur, 0);
     this.savedamnt = this.savedAmount.reduce((acc:any, cur:any) => acc + cur, 0);
    console.log(this.savedamnt);
     
    this.totalcoupons=this.cartlist.filter((item:any) => item.discount === item.discount).length
    console.log(this.totalcoupons)
   //this.totalbill = this.billtotal.reduce((acc:any, cur:any) => acc + cur, 0);
   //console.log(this.totalbill);
    this.totalquantity=this.cartlist.filter((item:any) => item.product_id === item.product_id).length
      }else{
       this.cartempty=true;
      }
    })
    
    

  }

  procpayment(){
    if(this.verifiedUser.dob){
      this.initPay();
    }
    else{
      this.router.navigate(['profile']);
    }
            
    
  }

  

  public initPay():void {
  this.options = {
      "key": "rzp_test_dveDexCQKoGszl",
      "amount": this.TotalPrice*100,
      "name": "PintsNShots",
      "handler": this.paymentCapture.bind(this),
      "theme": {
        "color": "#0c238a",
        "size" : "20%"
        
    },
    "prefill": {
      "name": this.verifiedUser.fullname,
      "email": this.verifiedUser.email,
      "contact": this.verifiedUser.mobile_no
  },
  
  
   };
   this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
  this.rzp1.open();
   //options.modal.ondismiss = this.razorpayReload.bind(this);
   

  
 }
 checkOut(){
  
  const formData = new FormData();
  formData.set('quantity',this.quantitylist.toString());
  formData.set('hotel_id',this.hotel_id);
  formData.set('discount',this.savedamnt );
  formData.set('product_price',this.productpricelist.toString());
  formData.set('user_id',this.verifiedUser.user_id );
  formData.set('total_amount',this.TotalPrice);
  formData.set('currency_type','Rupee' );
  formData.set('dob',this.verifiedUser.dob);
  formData.set('product_id', this.productIdlist.toString());
  formData.set('total_quantity',this.totalquantity);
  formData.set('action','order' );
  formData.set('unit_id',this.unitidlist.toString());
  formData.set('discount_id',this.discountlist.toString() );
  this.api.checkout(formData).subscribe((res:any)=>{
    console.log(res);
    if(res.ResponseCode ==0 ){
      
      alert("Order Placed Successfully");
      const  formParams= new FormData();
      formParams.set('transaction_id',this.payMentID);
  formParams.set('user_id',this.verifiedUser.user_id);
  formParams.set('payment_status','Success' );
  formParams.set('action','payment');
  formParams.set('order_id',res.data.order_id );
  formParams.set('status','Yes');
      this.api.payment(formParams).subscribe((data:any)=>{
        console.log(data);        
        this.paymentSuccess = true;
      })      
      
      // window.location.reload();
    }

    if(res.ResponseCode ==1 ){      
      alert(res.ResponseMessage);
    }
    
  })
  this.opnModal();
 }
 paymentCapture(response:any) {   
  this.payMentID = response.razorpay_payment_id;
   
   this.checkOut();
   
     
   
  //this.rzp1.dismiss();   
}

@HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
   
  }

  opnModal(){  
    this.rzp1.close();
    const modalRef = this.modalService.open(PaymentSuccessModalComponent,{windowClass:"myCustomModalClass",centered:true});
    modalRef.componentInstance.name = 'World';
    modalRef.result.then((data) => {
      //this.router.navigate(['']);
    }, (reason) => {
      this.router.navigate(['']);
      // on dismiss
    });
  }
}
