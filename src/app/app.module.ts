import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './myComponents/header/header.component';
import { FooterComponent } from './myComponents/footer/footer.component';
import { AboutComponent } from './myComponents/about/about.component';
import { HomeComponent } from './myComponents/home/home.component';
import { TaproomProductComponent } from './myComponents/taproom-product/taproom-product.component';
import { CoffeeShopComponent } from './myComponents/coffee-shop/coffee-shop.component';
import { ShishaLoungeComponent } from './myComponents/shisha-lounge/shisha-lounge.component';
import { ProductComponentsComponent } from './myComponents/product-components/product-components.component';
import { ProductDetalisComponent } from './myComponents/product-detalis/product-detalis.component';
import { AddCartComponent } from './myComponents/add-cart/add-cart.component';
import { CheckOutComponent } from './myComponents/check-out/check-out.component';
import { ContactUsComponent } from './myComponents/contact-us/contact-us.component';
import { LoginComponent } from './myComponents/login/login.component';
import { RegistrationComponent } from './myComponents/registration/registration.component';
import { ProfileComponent } from './myComponents/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import { OtpComponent } from './myComponents/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletComponent } from './myComponents/wallet/wallet.component';
import { BlogComponent } from './myComponents/blog/blog.component';
import { WalletDetailsComponent } from './myComponents/wallet-details/wallet-details.component';
import { WalletHistoryComponent } from './myComponents/wallet-history/wallet-history.component';
import { BlogDetailsComponent } from './myComponents/blog-details/blog-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotelDetailsComponent } from './myComponents/hotel-details/hotel-details.component';
import { SearchComponent } from './myComponents/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    TaproomProductComponent,
    CoffeeShopComponent,
    ShishaLoungeComponent,
    ProductComponentsComponent,
    ProductDetalisComponent,
    AddCartComponent,
    CheckOutComponent,
    ContactUsComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    OtpComponent,
    WalletComponent,
    BlogComponent,
    WalletDetailsComponent,
    WalletHistoryComponent,
    BlogDetailsComponent,
    HotelDetailsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOtpInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
    

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
