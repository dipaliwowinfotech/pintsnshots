import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './myComponents/about/about.component';
import { AddCartComponent } from './myComponents/add-cart/add-cart.component';
import { BlogDetailsComponent } from './myComponents/blog-details/blog-details.component';
import { BlogComponent } from './myComponents/blog/blog.component';
import { CheckOutComponent } from './myComponents/check-out/check-out.component';
import { CoffeeShopComponent } from './myComponents/coffee-shop/coffee-shop.component';
import { ContactUsComponent } from './myComponents/contact-us/contact-us.component';
import { HomeComponent } from './myComponents/home/home.component';
import { HotelDetalisComponent } from './myComponents/hotel-detalis/hotel-detalis.component';
import { LoginComponent } from './myComponents/login/login.component';
import { OrderHistoryComponent } from './myComponents/order-history/order-history.component';
import { OtpComponent } from './myComponents/otp/otp.component';
import { ProductComponentsComponent } from './myComponents/product-components/product-components.component';
import { ProductDetalisComponent } from './myComponents/product-detalis/product-detalis.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { RegistrationComponent } from './myComponents/registration/registration.component';
import { SearchComponent } from './myComponents/search/search.component';
import { ShishaLoungeComponent } from './myComponents/shisha-lounge/shisha-lounge.component';
import { TaproomProductComponent } from './myComponents/taproom-product/taproom-product.component';
import { WalletDetailsComponent } from './myComponents/wallet-details/wallet-details.component';
import { WalletHistoryComponent } from './myComponents/wallet-history/wallet-history.component';
import { WalletComponent } from './myComponents/wallet/wallet.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  // {
  //   path:'home',component:HomeComponent
  // },
  { path: 'about', component:AboutComponent 
 },
  
  { path: 'taproom-product', component:TaproomProductComponent  
},
  { path: 'coffee-shop', component:CoffeeShopComponent
},
  { path: 'shisha-lounge',component:ShishaLoungeComponent
},
  { path:'product-components'+'/:hotelId',component:ProductComponentsComponent
},
  {path:'product-detalis',component:ProductDetalisComponent
},
  {
    path:'add-cart',component:AddCartComponent
  },
  {
    path:'wallet',component:WalletComponent
  },
  {
    path:'blog',component:BlogComponent
  },
  {
    path:'blog-details',component:BlogDetailsComponent
  },
  {
    path:'check-out', component:CheckOutComponent
  },
  {
    path:'order-history', component:OrderHistoryComponent
  },
  {
    path:'search', component:SearchComponent
  },
  {
    path:'hotel-details'+'/:hotelId', component:HotelDetalisComponent
  },
  {
    path:'contact-us',component:ContactUsComponent
  },
   { path: 'login', component:LoginComponent  },
   {
    path:'registration',component:RegistrationComponent
   },
   {
    path:'profile',component:ProfileComponent
   },
   {
   path:'otp',component:OtpComponent
  },
  {
    path:'wallet-details'+'/:id'+'/:hotelId'+'/:status',component:WalletDetailsComponent
  },
  {
    path:'wallet-history',component:WalletHistoryComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
