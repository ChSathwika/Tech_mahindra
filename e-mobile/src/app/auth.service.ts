import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulate authentication (replace with actual backend logic)
    if (username === 'admin' && password === 'admin') {
      this.isLoggedInSubject.next(true);
      // Store login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Navigate to home page
      this.router.navigate(['/home']).then(() => {
        // Force navigation
        window.location.href = '/home';
      });
      return true;
    } else {
      this.isLoggedInSubject.next(false);
      localStorage.removeItem('isLoggedIn');
      return false;
    }
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']).then(() => {
      window.location.href = '/login';
    });
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value || localStorage.getItem('isLoggedIn') === 'true';
  }
}
