import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <div class="logo">
          <i class="fas fa-mobile-alt"></i>
        </div>
        <span class="brand-name">E-Mobile</span>
      </div>
      
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
          <i class="fas fa-home"></i> Home
        </a>
        <a routerLink="/products" routerLinkActive="active">
          <i class="fas fa-mobile-alt"></i> Products
        </a>
        <a routerLink="/cart" routerLinkActive="active">
          <i class="fas fa-shopping-cart"></i> Cart
        </a>
      </div>

      <button class="logout-btn" (click)="onLogout()">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #2e7d32;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo i {
      color: #2e7d32;
      font-size: 1.2rem;
    }

    .brand-name {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: white;
      text-decoration: none;
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-links a.active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 500;
    }

    .logout-btn {
      background-color: transparent;
      border: 2px solid white;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background-color: white;
      color: #2e7d32;
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
      }

      .nav-links a {
        padding: 0.4rem 0.8rem;
        font-size: 1rem;
      }

      .logout-btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .brand-name {
        font-size: 1.3rem;
      }

      .nav-links {
        flex-direction: column;
        width: 100%;
      }

      .nav-links a {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class NavComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
} 