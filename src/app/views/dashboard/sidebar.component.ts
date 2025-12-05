import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside [class.collapsed]="collapsed" class="sidebar">
      <div class="sidebar-header">
        <button (click)="toggleSidebar()" class="toggle-btn">
          {{ collapsed ? '☰' : '×' }}
        </button>
        <h3 *ngIf="!collapsed">Dashboard</h3>
      </div>

      <nav class="menu">
       

        <a
          routerLink="table"
          routerLinkActive="active"
          [title]="'Table'"
        >
          <span class="icon">📊</span>
          <span *ngIf="!collapsed">Table</span>
        </a>

        <a
          routerLink="cards"
          routerLinkActive="active"
          [title]="'Cards'"
        >
          <span class="icon">💳</span>
          <span *ngIf="!collapsed">Cards</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      background: var(--sidebar-bg, #0f172a);
      color: #f8fafc;
      width: 260px;
      transition: width 0.3s ease;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 60px);
      box-shadow: inset -1px 0 0 rgba(255,255,255,0.1);
    }

    .sidebar.collapsed {
      width: 80px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .toggle-btn:hover {
      transform: scale(1.1);
    }

    .menu {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0;
    }

    .menu a {
      color: #e2e8f0;
      text-decoration: none;
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border-radius: 6px;
      transition: background 0.2s;
    }

    .menu a:hover {
      background: rgba(255,255,255,0.1);
    }

    .menu a.active {
      background: rgba(255,255,255,0.25);
    }
  `]
})
export class SidebarComponent {
  collapsed = false;
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
