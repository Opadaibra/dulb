import { Component } from '@angular/core';
import { TranslateStateService } from '../services/translate-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher" *ngIf="availableLangs.length > 0">
      <select id="lang-select" [value]="currentLang" (change)="changeLang($event)">
        <option *ngFor="let lang of availableLangs" [value]="lang">{{ lang.toUpperCase() }}</option>
      </select>
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: Arial, sans-serif;
      margin: 0px 2px;
    }

    .language-switcher label {
      font-weight: bold;
      font-size: 16px;
    }

    .language-switcher select {
      padding: 4px 8px;
      font-size: 14px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .language-switcher select:hover {
      border-color: #888;
      background-color: #f9f9f9;
    }

    .language-switcher select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0,123,255,0.5);
    }
  `]
})
export class LanguageSwitcherComponent {
  availableLangs: string[] = [];
  currentLang = '';

  constructor(private translateState: TranslateStateService) {
    this.currentLang = this.translateState.currentLang;

    // جلب اللغات عند التحميل
    setTimeout(() => {
      this.availableLangs = this.translateState.availableLangs;
      
    }, 500);
   
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translateState.setLang(lang);
    this.currentLang = lang;
  }
}
