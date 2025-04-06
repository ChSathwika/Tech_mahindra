import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      RouterModule.forRoot([
        { path: '', component: HomeComponent },
        { path: 'login', component: LoginComponent },
       // { path: 'products', component: ProductListComponent },
        { path: 'product/:id', component: ProductDetailComponent },
        { path: 'cart', component: CartComponent },
      ])
    ],
    declarations: [AppComponent],  // Only declare AppComponent here
    bootstrap: [AppComponent]
})
export class AppModule { }