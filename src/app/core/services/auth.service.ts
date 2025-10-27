import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user is already authenticated (e.g., from localStorage)
    this.checkAuthStatus();
  }

  /**
   * Login with Microsoft SSO
   * @returns Promise<boolean> - true if login successful
   */
  async loginWithMicrosoftSSO(): Promise<boolean> {
    try {
      // Placeholder implementation
      console.log('Microsoft SSO login initiated');

      // In real implementation, this would:
      // 1. Redirect to Microsoft OAuth endpoint
      // 2. Handle OAuth callback
      // 3. Exchange code for tokens
      // 4. Store tokens securely
      // 5. Update authentication status

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, set as authenticated
      this.setAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Microsoft SSO login failed:', error);
      return false;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    // Clear any stored tokens
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');

    // Update authentication status
    this.setAuthenticated(false);

    console.log('User logged out');
  }

  /**
   * Check if user is currently authenticated
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Get current authentication status as Observable
   * @returns Observable<boolean>
   */
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  /**
   * Set authentication status
   * @param status - authentication status
   */
  private setAuthenticated(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }

  /**
   * Check authentication status from stored data
   */
  private checkAuthStatus(): void {
    // In real implementation, this would:
    // 1. Check for valid JWT token in localStorage/sessionStorage
    // 2. Validate token with backend
    // 3. Set authentication status accordingly

    const token = localStorage.getItem('auth_token');
    const isAuthenticated = !!token; // Simple check for demo

    this.setAuthenticated(isAuthenticated);
  }

  /**
   * Get user information
   * @returns object - user data or null if not authenticated
   */
  getUserInfo(): object | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    // In real implementation, this would return user data from token or API
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
