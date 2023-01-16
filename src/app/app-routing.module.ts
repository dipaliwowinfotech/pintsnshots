import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './myComponents/about/about.component';
import { AddCartComponent } from './myComponents/add-cart/add-cart.component';
import { BlogComponent } from './myComponents/blog/blog.component';
import { CheckOutComponent } from './myComponents/check-out/check-out.component';
import { CoffeeShopComponent } from './myComponents/coffee-shop/coffee-shop.component';
import { ContactUsComponent } from './myComponents/contact-us/contact-us.component';
import { HomeComponent } from './myComponents/home/home.component';
import { LoginComponent } from './myComponents/login/login.component';
import { OtpComponent } from './myComponents/otp/otp.component';
import { ProductComponentsComponent } from './myComponents/product-components/product-components.component';
import { ProductDetalisComponent } from './myComponents/product-detalis/product-detalis.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import { RegistrationComponent } from './myComponents/registration/registration.component';
import { ShishaLoungeComponent } from './myComponents/shisha-lounge/shisha-lounge.component';
import { TaproomProductComponent } from './myComponents/taproom-product/taproom-product.component';
import { WalletDetailsComponent } from './myComponents/wallet-details/wallet-details.component';
import { WalletComponent } from './myComponents/wallet/wallet.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  { path: 'about', component:AboutComponent 
 },
  { path: 'home', component:HomeComponent  
},
  { path: 'taproom-product', component:TaproomProductComponent  
},
  { path: 'coffee-shop', component:CoffeeShopComponent
},
  { path: 'shisha-lounge',component:ShishaLoungeComponent
},
  { path:'product-components',component:ProductComponentsComponent
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
    path:'check-out', component:CheckOutComponent
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
    path:'wallet-details',component:WalletDetailsComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
