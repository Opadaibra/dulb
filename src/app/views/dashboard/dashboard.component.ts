import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent, RouterOutlet],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>
      <div class="main">
        <app-sidebar></app-sidebar>
        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .main {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .content {
      flex: 1;
      padding: 1.5rem;
      background: var(--content-bg, #f8fafc);
      overflow-y: auto;
      transition: background 0.3s;
    }
  `]
})
export class DashboardComponent {}
