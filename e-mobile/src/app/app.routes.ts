import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'products', 
    component: ProductsComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'product/:id', 
    component: ProductDetailComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'cart', 
    component: CartComponent, 
    canActivate: [authGuard] 
  },
  { path: '**', redirectTo: '/login' }
];
