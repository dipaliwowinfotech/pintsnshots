import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment-success-modal',
  templateUrl: './payment-success-modal.component.html',
  styleUrls: ['./payment-success-modal.component.css']
})
export class PaymentSuccessModalComponent implements OnInit {
  @Input() name:any;
  constructor(public activeModal: NgbActiveModal, public router: Router) { }

  ngOnInit(): void {
  }


  onClick(){
    this.activeModal.close();
    this.router.navigate(['']);    
  }

  onThank(){
    this.activeModal.close();
    setTimeout(()=>{
      window.location.reload();
     },30)
    this.router.navigate(['wallet']);    
  }

}
