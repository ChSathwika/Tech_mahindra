import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Check if user is already logged in (only in browser environment)
    if (this.isBrowser) {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        this.isAuthenticated = true;
      }
    }
  }

  login(username: string): boolean {
    this.isAuthenticated = true;
    if (this.isBrowser) {
      localStorage.setItem('loggedInUser', username);
    }
    return true;
  }

  logout(): void {
    this.isAuthenticated = false;
    if (this.isBrowser) {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('registeredUser');
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
} 