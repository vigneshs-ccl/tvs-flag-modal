import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onMicrosoftLogin(): void {
    this.isLoading = true;
    this.authService
      .loginWithMicrosoftSSO()
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Microsoft login failed:', error);
        this.isLoading = false;
      });
  }
}
