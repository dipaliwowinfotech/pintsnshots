import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    const form_data = new FormData();
    form_data.set('offset', '0');
    form_data.set('action', 'order_history');
    form_data.set('limit', '10');
    form_data.set('order_id', '459');
    this.api.orderhistory(form_data).subscribe((res:any)=>{
      console.log(res);
      this.orderHistory = res.data;
    })
  }

}
