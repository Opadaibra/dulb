  import { Component } from '@angular/core';
  import { ThemeService } from '../services/theme.service';

  @Component({
    selector: 'app-theme-toggle',
    template: `
      <div class="theme-toggle">
        <input type="checkbox" id="themeSwitch" (change)="toggleTheme()" [checked]="isDarkTheme"/>
        <label for="themeSwitch" class="slider">
          <!-- <span class="sun-icon">🌞</span>
          <span class="moon-icon">🌙</span> -->
        </label>
      </div>
    `,
    styles: [`
      .theme-toggle {
        position: relative;
        width: 70px;
        height: 32px;

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 34px;
          background: linear-gradient(145deg, #b3823c, #9a6e33);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);

          .sun-icon, .moon-icon {
            font-size: 14px;
            transition: opacity 0.3s ease;
          }

          .sun-icon {
            opacity: 1;
          }

          .moon-icon {
            opacity: 0.7;
          }

          &:before {
            content: "";
            position: absolute;
            height: 26px;
            width: 26px;
            left: 3px;
            bottom: 3px;
            background-color: #fff;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 2;
          }
        }

        input:checked + .slider {
          background: linear-gradient(145deg, #3f3f2c, #2a2a1e);
        }

        input:checked + .slider:before {
          transform: translateX(38px);
        }

        input:checked + .slider .sun-icon {
          opacity: 0.7;
        }

        input:checked + .slider .moon-icon {
          opacity: 1;
        }
      }
    `]
  })
  export class ThemeToggleComponent {
    get isDarkTheme(): boolean {
      return this.themeService.isDarkTheme();
    }

    constructor(public themeService: ThemeService) { }

    toggleTheme() {
      console.log('Toggling theme...');
      this.themeService.toggleTheme();
      setTimeout(() => {
        console.log('Current theme:', this.themeService.getCurrentTheme());
        console.log('Body classes:', document.body.className);
      }, 100);
    }
  }