import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import {ModalDismissReasons, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
  showError: boolean= false;
  
  closeResult!: string;
  
  constructor(private api:ApiService,private modalService: NgbModal,
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
      quantity:['',[Validators.required]]
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
      if(res){
        this.walletdetails = res.data;
      }
      if(!res){
        this.showError = true;
      }
      
      
      
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
      if(res){
        this.walletdetails = res.data;
      }
      if(!res){
        this.showError = true;
      }
      
    })
  }
  get form() { return this.mobileForm.controls; }

  checkMobile(content:any){
    
    if(this.mobileForm.valid){
console.log(this.mobileForm.value);
    const formData = new FormData();
    formData.set('email',this.mobileForm.value.mobile);
    formData.set('action','share_step1');
    this.api.walletMobileCheck(formData).subscribe((res:any)=>{
      console.log(res);
      if(res.ResponseCode ==1){
alert(res.ResponseMessage);
      }else{
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      
      this.shareUser = res.data;
      this.shareUserName = this.shareUser.fullname;
    })
  }
  else{
    alert("Please Enter Mobile Number");
  }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getPrice(item:any){
    
    this.price = item.product_price -(item.product_price * item.discount_id/100)
console.log(this.price );
  }

  openMobileModal(item:any,modal:any){
    this.itemData = item;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(item)
 }
 
 shareWallet(){
  if(this.quantityForm.valid){
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
        this.walletDetails();
      }
      
    })
  }
  else{
    alert('Total Quantity Available:'+this.itemData.quantity);
    }
  }else{
    alert('Please Enter quantity');
  }
 }

}
