import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `
    <nav *ngIf="authService.isLoggedIn()" class="navbar">
      <div class="brand">
        <i class="fas fa-mobile-alt"></i>
        <span>E-Mobile</span>
      </div>
      <div class="nav-links">
        <a routerLink="/products" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Products</a>
        <a routerLink="/cart" routerLinkActive="active">Cart</a>
        <button (click)="onLogout()" class="logout-btn">Logout</button>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      background-color: #2c3e50;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      color: #ecf0f1;
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .nav-links a:hover {
      background-color: #34495e;
    }

    .nav-links a.active {
      background-color: #3498db;
    }

    .logout-btn {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    .logout-btn:hover {
      background-color: #c0392b;
    }

    main {
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .nav-links {
        flex-direction: column;
        width: 100%;
      }

      .nav-links a, .logout-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}