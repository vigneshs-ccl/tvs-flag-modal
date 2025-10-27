import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="employee-container">
      <h1>Employee Dashboard</h1>
      <p>Welcome to the Employee module. This is a placeholder component.</p>
    </div>
  `,
  styles: [
    `
      .employee-container {
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
export class EmployeeComponent {}
