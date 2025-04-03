import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="signup-page">
      <div class="signup-container">
        <div class="brand-section">
          <div class="logo">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <h1>E-Mobile</h1>
          <p class="tagline">Your Premium Mobile Store</p>
        </div>
        
        <div class="signup-box">
          <div class="signup-header">
            <h2>Create Account</h2>
            <p class="subtitle">Join our premium mobile store</p>
          </div>
          
          <form (ngSubmit)="onSignup()" #signupForm="ngForm" class="signup-form">
            <div class="form-group">
              <label for="fullName">
                <i class="fas fa-user"></i>
                Full Name
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                [(ngModel)]="fullName" 
                required 
                minlength="3"
                placeholder="Enter your full name">
              <div class="error-text" *ngIf="signupForm.controls['fullName']?.touched && signupForm.controls['fullName']?.errors?.['required']">
                Full name is required
              </div>
              <div class="error-text" *ngIf="signupForm.controls['fullName']?.touched && signupForm.controls['fullName']?.errors?.['minlength']">
                Name must be at least 3 characters long
              </div>
            </div>

            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                [(ngModel)]="email" 
                required 
                email
                placeholder="Enter your email">
              <div class="error-text" *ngIf="signupForm.controls['email']?.touched && signupForm.controls['email']?.errors?.['required']">
                Email is required
              </div>
              <div class="error-text" *ngIf="signupForm.controls['email']?.touched && signupForm.controls['email']?.errors?.['email']">
                Please enter a valid email address
              </div>
            </div>

            <div class="form-group">
              <label for="username">
                <i class="fas fa-user-circle"></i>
                Username
              </label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                [(ngModel)]="username" 
                required 
                minlength="4"
                placeholder="Choose a username">
              <div class="error-text" *ngIf="signupForm.controls['username']?.touched && signupForm.controls['username']?.errors?.['required']">
                Username is required
              </div>
              <div class="error-text" *ngIf="signupForm.controls['username']?.touched && signupForm.controls['username']?.errors?.['minlength']">
                Username must be at least 4 characters long
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
                minlength="8"
                placeholder="Create a password">
              <div class="error-text" *ngIf="signupForm.controls['password']?.touched && signupForm.controls['password']?.errors?.['required']">
                Password is required
              </div>
              <div class="error-text" *ngIf="signupForm.controls['password']?.touched && signupForm.controls['password']?.errors?.['minlength']">
                Password must be at least 8 characters long
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">
                <i class="fas fa-lock"></i>
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                [(ngModel)]="confirmPassword" 
                required 
                placeholder="Confirm your password">
              <div class="error-text" *ngIf="signupForm.controls['confirmPassword']?.touched && signupForm.controls['confirmPassword']?.errors?.['required']">
                Please confirm your password
              </div>
              <div class="error-text" *ngIf="confirmPassword && password !== confirmPassword">
                Passwords do not match
              </div>
            </div>

            <div class="success-message" *ngIf="successMessage">
              <i class="fas fa-check-circle"></i>
              {{ successMessage }}
            </div>

            <div class="error-message" *ngIf="errorMessage">
              <i class="fas fa-exclamation-circle"></i>
              {{ errorMessage }}
            </div>

            <button 
              type="submit" 
              [disabled]="!signupForm.valid || isLoading || password !== confirmPassword" 
              class="signup-btn">
              <i class="fas" [ngClass]="isLoading ? 'fa-spinner fa-spin' : 'fa-user-plus'"></i>
              {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
            </button>

            <div class="signup-footer">
              <p>Already have an account? <a routerLink="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .signup-container {
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

    .signup-box {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .signup-header {
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
      margin-bottom: 1.5rem;
      position: relative;
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

    .error-text {
      color: #d32f2f;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .error-text::before {
      content: "•";
      color: #d32f2f;
    }

    .signup-btn {
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
      margin-top: 1rem;
    }

    .signup-btn:hover {
      background-color: #1b5e20;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
    }

    .signup-btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .success-message {
      color: #2e7d32;
      background-color: #e8f5e9;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1rem;
      border: 1px solid #c8e6c9;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .signup-footer {
      margin-top: 2rem;
      text-align: center;
      color: #666;
    }

    .signup-footer p {
      margin: 0;
    }

    .signup-footer a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .signup-footer a:hover {
      color: #1b5e20;
    }

    @media (max-width: 992px) {
      .signup-container {
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
      .signup-page {
        padding: 1rem;
      }

      .signup-box {
        padding: 2rem;
      }

      h2 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.1rem;
      }

      input, .signup-btn {
        padding: 0.9rem;
        font-size: 1rem;
      }
    }

    @media (max-width: 480px) {
      .signup-box {
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
export class SignupComponent implements OnInit {
  @ViewChild('signupForm') signupForm!: NgForm;
  
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
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

  onSignup() {
    // Mark all fields as touched to trigger validation messages
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.controls[key];
      control.markAsTouched();
    });

    if (!this.signupForm.valid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call
    setTimeout(() => {
      // Here you would typically make an API call to register the user
      // For demo purposes, we'll simulate a successful registration
      const user = {
        username: this.username,
        password: this.password,
        email: this.email,
        fullName: this.fullName
      };
      
      // Store user data in localStorage (for demo purposes)
      localStorage.setItem('registeredUser', JSON.stringify(user));
      
      // Show success message
      this.successMessage = 'Account created successfully!';
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
      
      this.isLoading = false;
    }, 1000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 