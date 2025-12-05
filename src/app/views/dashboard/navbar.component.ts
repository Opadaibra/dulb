import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="logo">🌐 My Dashboard</div>
      <div class="actions">
        <button class="btn">Profile</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      height: 60px;
      background: var(--nav-bg, #1e293b);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .logo {
      font-weight: 600;
      font-size: 1.1rem;
    }
    .btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.2s;
    }
    .btn:hover {
      background: #2563eb;
    }
  `]
})
export class NavbarComponent {}
