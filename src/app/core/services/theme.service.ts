import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // تحميل الثيم عند التهيئة
    if (isPlatformBrowser(this.platformId)) {
      // استخدام requestAnimationFrame للتأكد من أن DOM جاهز
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.loadInitialTheme());
      } else {
        this.loadInitialTheme();
      }
    }
  }

  private loadInitialTheme() {
    // التحقق من أننا في المتصفح
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('dulb-theme');
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme = savedTheme;
    } else {
      // استخدام قيمة افتراضية إذا لم يكن matchMedia متاحاً
      this.currentTheme = 'light';
      
      // محاولة اكتشاف تفضيلات النظام إذا كان المتصفح يدعمها
      if (window.matchMedia) {
        try {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.currentTheme = prefersDark ? 'dark' : 'light';
        } catch (e) {
          console.log('Theme detection error, using default light theme');
        }
      }
    }
    
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }
    
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('dulb-theme', this.currentTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  private applyTheme(theme: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const body = document.body;
    const root = document.documentElement;
    
    // إزالة الكلاسات القديمة
    ['light', 'dark', 'light-theme', 'dark-theme'].forEach(cls => {
      body.classList.remove(cls);
    });
    
    // إضافة الكلاسات الجديدة
    body.classList.add(theme);
    body.classList.add(`${theme}-theme`);
    
    // تحديث CSS variables
    this.updateCSSVariables(theme);
  }

  private updateCSSVariables(theme: string) {
    const root = document.documentElement;
    
    const lightVariables = {
      '--bg-color': '#fcfaf8',
      '--primary-color': '#c99344',
      '--secondary-color': '#333328',
      '--third-color': '#9d9466',
      '--text-color': '#333328',
      '--card-bg': '#ffffff',
      '--new-card-bg': '#ffffff',
      '--footer-bg': '#E1E1E1',
      '--hero-bg': '#fffbf5',
      '--border-color': '#ececec',
      '--primary-color-shadow': '#c9934440',
      '--card-bg-transparent': 'rgba(255, 255, 255, 0.92)',
      '--accent-gradient': 'linear-gradient(135deg, #c99344 0%, #e3b76a 100%)',
      '--accent-gradient-img': 'linear-gradient(135deg, #c99344 0%, #e3b76a 100%)',
      '--glass-bg': 'rgba(255, 255, 255, 0.1)',
      '--glass-border': 'rgba(255, 255, 255, 0.5)'
    };
    
    const darkVariables = {
      '--bg-color': '#2e2a2a',
      '--primary-color': '#e3b76a',
      '--secondary-color': '#b0b085',
      '--third-color': '#9d9466',
      '--text-color': '#f0f0f0',
      '--card-bg': '#2b2828',
      '--new-card-bg': '#81754c',
      '--footer-bg': '#81754c',
      '--border-color': '#2a2a2a',
      '--primary-color-shadow': 'rgba(0,0,0,0)',
      '--card-bg-transparent': 'rgba(26, 26, 26, 0.85)',
      '--glass-bg': 'rgba(26, 26, 26, 0.3)',
      '--glass-border': 'rgba(255, 255, 255, 0.1)',
      '--accent-gradient': 'linear-gradient(135deg, #c99344 0%, #e3b76a 100%)',
      '--accent-gradient-img': 'transparent'
    };
    
    const variables = theme === 'light' ? lightVariables : darkVariables;
    
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}