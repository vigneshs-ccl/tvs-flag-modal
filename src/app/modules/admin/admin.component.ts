import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin module. This is a placeholder component.</p>
    </div>
  `,
  styles: [
    `
      .admin-container {
        padding: 2rem;
      }

      h1 {
        color: #333;
        margin-bottom: 1rem;
      }

      p {
        color: #666;
      }
    `,
  ],
})
export class AdminComponent {}
