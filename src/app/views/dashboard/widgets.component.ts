import { Component } from '@angular/core';

@Component({
  selector: 'app-widgets',
  standalone: true,
  template: `
    <div class="widgets">
      <h4>Widgets</h4>
      <div class="card">📈 Sales: $12,340</div>
      <div class="card">👥 Users: 532</div>
      <div class="card">🚀 Growth: 8%</div>
    </div>
  `,
  styles: [`
    .widgets {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .card {
      background: rgba(255,255,255,0.1);
      padding: 0.8rem;
      border-radius: 8px;
      text-align: center;
    }
  `]
})
export class WidgetsComponent {}
