import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateStateService } from '../services/translate-state.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      @if (isLoading) {
        <div class="loading">🌐</div>
      } @else if (availableLangs.length > 1) {
        <select 
          id="lang-select" 
          [value]="currentLang" 
          (change)="changeLang($event)"
          [attr.aria-label]="'Select language'"
        >
          @for (lang of availableLangs; track lang) {
            <option [value]="lang">
              {{ getLangName(lang) }}
            </option>
          }
        </select>
      } @else if (availableLangs.length === 1) {
        <div class="single-lang">
          {{ getLangName(availableLangs[0]) }}
        </div>
      } @else {
        <div class="error">⚠️</div>
      }
    </div>
  `,
  styles: [`
    .language-switcher {
      display: flex;
      align-items: center;
      font-family: "Inter", sans-serif;
      margin: 0 5px;
    }

    .language-switcher select {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      border: 2px solid var(--border-color);
      background-color: var(--card-bg);
      color: var(--text-color);
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 80px;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 8px center;
      background-size: 16px;
      padding-right: 32px;
    }

    .language-switcher select:hover {
      border-color: var(--primary-color);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .language-switcher select:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(179, 130, 60, 0.2);
    }

    .loading {
      font-size: 18px;
      animation: spin 1.5s linear infinite;
      opacity: 0.7;
    }

    .single-lang {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-color);
      border-radius: 8px;
      background-color: var(--bg-color);
      border: 2px solid transparent;
    }

    .error {
      font-size: 18px;
      color: #dc3545;
      cursor: help;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Dark theme adjustments */
    :host-context(.dark-theme) .language-switcher select {
      background-color: var(--card-bg);
      border-color: var(--border-color);
    }

    /* RTL support */
    :host-context([dir="rtl"]) .language-switcher select {
      background-position: left 8px center;
      padding-right: 12px;
      padding-left: 32px;
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  availableLangs: string[] = [];
  currentLang = '';
  isLoading = true;
  private langSubscription?: Subscription;

  // تعريف أسماء اللغات
  private langNames: { [key: string]: string } = {
    'en': 'English',
    'ar': 'العربية',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch'
  };

  constructor(private translateState: TranslateStateService) {}

  ngOnInit() {
    // الاشتراك في تغييرات اللغة
    this.langSubscription = this.translateState.lang$.subscribe(lang => {
      this.currentLang = lang;
    });

    // تحميل اللغات المتاحة
    this.loadAvailableLanguages();
  }

  private async loadAvailableLanguages() {
    this.isLoading = true;
    
    // الانتظار لمدة قصيرة لضمان تحميل الترجمة
    setTimeout(async () => {
      try {
        this.availableLangs = this.translateState.availableLangs || [];
        
        // إذا لم تكن اللغات متاحة بعد، حاول مرة أخرى
        if (this.availableLangs.length === 0) {
          // محاولة ثانية بعد تأخير
          setTimeout(() => {
            this.availableLangs = this.translateState.availableLangs || [];
            this.isLoading = false;
          }, 1000);
        } else {
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Error loading languages:', error);
        this.isLoading = false;
        // Fallback إلى اللغات الأساسية
        this.availableLangs = ['en', 'ar'];
      }
    }, 300);
  }

  getLangName(langCode: string): string {
    return this.langNames[langCode] || langCode.toUpperCase();
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    if (lang && lang !== this.currentLang) {
      this.translateState.setLang(lang);
    }
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}