import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coach',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coach-container">
      <h1>Coach Dashboard</h1>
      <p>Welcome to the Coach module. This is a placeholder component.</p>
    </div>
  `,
  styles: [
    `
      .coach-container {
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
export class CoachComponent {}
