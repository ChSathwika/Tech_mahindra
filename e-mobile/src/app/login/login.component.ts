// --- login.component.ts ---
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="brand-section">
          <div class="logo">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h1>E-Mobile</h1>
          <p class="tagline">Your Premium Mobile Store</p>
        </div>
        
        <div class="login-box">
          <div class="login-header">
            <h2>Welcome Back</h2>
            <p class="subtitle">Login to your account</p>
          </div>
          
          <form (ngSubmit)="onLogin()" #loginForm="ngForm" class="login-form">
            <div class="form-group">
              <label for="username">
                <i class="fas fa-user"></i>
                Username
              </label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                required 
                placeholder="Enter your username">
              <div class="error-text" *ngIf="loginForm.controls['username']?.touched && loginForm.controls['username']?.errors?.['required']">
                Username is required
              </div>
            </div>

            <div class="form-group">
              <label for="password">
                <i class="fas fa-lock"></i>
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                [(ngModel)]="password" 
                required 
                placeholder="Enter your password">
              <div class="error-text" *ngIf="loginForm.controls['password']?.touched && loginForm.controls['password']?.errors?.['required']">
                Password is required
              </div>
            </div>

            <div class="error-message" *ngIf="errorMessage">
              <i class="fas fa-exclamation-circle"></i>
              {{ errorMessage }}
            </div>

            <button 
              type="submit" 
              [disabled]="!loginForm.valid || isLoading" 
              class="login-btn">
              <i class="fas" [ngClass]="isLoading ? 'fa-spinner fa-spin' : 'fa-sign-in-alt'"></i>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>

            <div class="login-footer">
              <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
              <a href="#" class="forgot-password">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-container {
      width: 100%;
      max-width: 1200px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .brand-section {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .logo {
      width: 100px;
      height: 100px;
      background: #2e7d32;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .logo i {
      font-size: 3rem;
      color: white;
    }

    .brand-section h1 {
      color: #2e7d32;
      font-size: 3rem;
      margin: 0;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tagline {
      color: #666;
      font-size: 1.4rem;
      margin: 1rem 0 0;
      font-weight: 500;
    }

    .login-box {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    h2 {
      color: #2e7d32;
      font-size: 2.5rem;
      margin: 0 0 0.5rem;
      font-weight: 700;
    }

    .subtitle {
      color: #666;
      font-size: 1.2rem;
      margin: 0;
    }

    .form-group {
      margin-bottom: 1.8rem;
    }

    label {
      display: block;
      margin-bottom: 0.8rem;
      color: #333;
      font-weight: 500;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    label i {
      color: #2e7d32;
    }

    input {
      width: 100%;
      padding: 1rem 1.2rem;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      outline: none;
      border-color: #2e7d32;
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
    }

    .login-btn {
      width: 100%;
      padding: 1.2rem;
      background-color: #2e7d32;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .login-btn:hover {
      background-color: #1b5e20;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
    }

    .login-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .error-message {
      color: #d32f2f;
      background-color: #ffebee;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1rem;
      border: 1px solid #ffcdd2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .login-footer {
      margin-top: 2rem;
      text-align: center;
      color: #666;
    }

    .login-footer p {
      margin: 0 0 1rem;
    }

    .login-footer a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .login-footer a:hover {
      color: #1b5e20;
    }

    .forgot-password {
      display: block;
      margin-top: 1rem;
    }

    @media (max-width: 992px) {
      .login-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .brand-section {
        padding: 1.5rem;
      }

      .logo {
        width: 80px;
        height: 80px;
      }

      .logo i {
        font-size: 2.5rem;
      }

      .brand-section h1 {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 768px) {
      .login-page {
        padding: 1rem;
      }

      .login-box {
        padding: 2rem;
      }

      h2 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      input, .login-btn {
        padding: 0.9rem;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .login-box {
        padding: 1.5rem;
      }

      .brand-section h1 {
        font-size: 2rem;
      }

      .tagline {
        font-size: 1.2rem;
      }

      h2 {
        font-size: 1.8rem;
      }

      label {
        font-size: 1rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Get registered user from localStorage
    const registeredUserStr = localStorage.getItem('registeredUser');
    if (!registeredUserStr) {
      this.errorMessage = 'No registered user found. Please sign up first.';
      this.isLoading = false;
      return;
    }

    const registeredUser = JSON.parse(registeredUserStr);

    // Simulate API call
    setTimeout(() => {
      // Exact credential matching
      if (this.username.trim().toLowerCase() === registeredUser.username.trim().toLowerCase() && 
          this.password === registeredUser.password) {
        // Login successful
        this.authService.login(this.username);
        this.router.navigate(['/products']);
      } else {
        // Login failed - show specific error message
        if (this.username.trim().toLowerCase() !== registeredUser.username.trim().toLowerCase()) {
          this.errorMessage = 'Invalid username';
        } else if (this.password !== registeredUser.password) {
          this.errorMessage = 'Invalid password';
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }
      this.isLoading = false;
    }, 1000);
  }
}